import { AnyTxtRecord } from "dns";
import { UserDatabase } from "../data/UserDataBase";
import { CustomError } from "../error/CustomError";
import { InvalidEmail, InvalidPassword, NotNullEmail, NotNullName, NotNullPassword, PasswordIncorrect, UserNotFound } from "../error/UserError";
import { login } from "../model/user/login";
import { user } from "../model/user/user";
import { userInputDTO } from "../model/user/userDTO";
import { Authenticator } from "../services/Authenticator";
import { generateId } from "../services/idGenerator";

const authenticator = new Authenticator()
export class UserBusiness{
    createUser =async (input:userInputDTO) => {
        try{
            const {name, email, password} = input;

            if(!name){
                throw new NotNullName()
            }else if(!email){
                throw new NotNullEmail()
            }else if(!password){
                throw new NotNullPassword()
            }else if (!email.includes("@")){
                throw new InvalidEmail
            }else if(password.length <=6){
                throw new InvalidPassword
            }

            const id: string = generateId()

            const user:user={
                id,
                name,
                email,
                password
            }

            const userDatabase = new UserDatabase();
            await userDatabase.insertUser(user)

            const token = authenticator.generateToken({id})

            return token

        }catch(error:any){
            throw new Error(error.message)
        }
    };

    login = async (input: login) =>{
        try{
            const {email, password} = input;

            if(!email){
                throw new NotNullEmail
            }else if(!password){
                throw new NotNullPassword
            }

            if (!email.includes("@")) {
                throw new InvalidEmail();
              }

            const id: string = generateId()

            const userDatabase = new UserDatabase();
            const user = await userDatabase.findUserByEmail(email);

            if(!user){
                throw new UserNotFound()
            }

            if(user.password != password){
                throw new PasswordIncorrect()
            }

            const token = authenticator.generateToken({id: user.id})

            return token
        }catch(error:any){
            throw new CustomError(400, error.message)
        }
    };
}