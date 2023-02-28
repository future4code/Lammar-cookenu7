import { AnyTxtRecord } from "dns";
import { UserDatabase } from "../data/UserDataBase";
import { InvalidEmail, InvalidPassword, NotNullEmail, NotNullName, NotNullPassword } from "../error/UserError";
import { user } from "../model/user";
import { userInputDTO } from "../model/userDTO";
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
    }
}