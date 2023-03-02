import { AnyTxtRecord } from "dns";
import { UserDatabase } from "../data/UserDataBase";
import { CustomError } from "../error/CustomError";
import { NotNullTitle } from "../error/RecipesError";
import { InvalidEmail, InvalidPassword, NotNullEmail, NotNullIdFollow, NotNullName, NotNullPassword, NotNullToken, PasswordIncorrect, UserNotFound } from "../error/UserError";
import { Follow } from "../model/follow/follow";
import { FollowInputDTO } from "../model/follow/followDTO";
import { getUserDTO } from "../model/user/getUserDTO.";
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

    getUser = async (input:getUserDTO) =>{
        try{
            const {token} = input;

            if(!token){
                throw new NotNullToken();
            }

            const {id} = authenticator.getTokenData(token)

            const userDatabase = new UserDatabase();
            await userDatabase.getUser(id);
        }catch(error:any){
            throw new CustomError(400, error.message)
        }
    }

    createFollow =async (input:FollowInputDTO) => {
        try{
            const {id_followed, token} = input;

            if(!id_followed){
                throw new NotNullIdFollow()
            }else if(!token){
                throw new NotNullToken()
            }

            const generatedId: string = generateId()

            const {id} = authenticator.getTokenData(token)

            const follow:Follow={
                id:generatedId,
                id_followed,
                id_following:id
            }

            const userDatabase = new UserDatabase();
            await userDatabase.createFollow(follow)

        }catch(error:any){
            throw new Error(error.message)
        }
    }

     unfollow =async (input:FollowInputDTO) => {
        try{
            const {id_followed, token} = input;

            if(!id_followed){
                throw new NotNullIdFollow()
            }else if(!token){
                throw new NotNullToken()
            }

            const generatedId: string = generateId()

            const {id} = authenticator.getTokenData(token)

            const unfollow:Follow={
                id: generatedId,
                id_followed,
                id_following: id
            }

            const userDatabase = new UserDatabase();
            await userDatabase.unfollow(unfollow)

        }catch(error:any){
            throw new Error(error.message)
        }
    } 

}