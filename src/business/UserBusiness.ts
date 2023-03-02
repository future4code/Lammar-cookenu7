import { UserDatabase } from "../data/UserDataBase";
import { CustomError } from "../error/CustomError";
import { 
    InvalidEmail, InvalidPassword, InvalidRole, 
    NotNullEmail, NotNullIdFollow, NotNullName, NotNullPassword, NotNullRole, NotNullToken, 
    PasswordIncorrect, UserNotFound 
} from "../error/UserError";
import { Follow } from "../model/follow/follow";
import { FollowInputDTO } from "../model/follow/followDTO";
import { login } from "../model/user/login";
import { user } from "../model/user/user";
import { userInputDTO } from "../model/user/userDTO";
import { UserRole } from "../model/user/userRole";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { generateId } from "../services/idGenerator";

const authenticator = new Authenticator()
const hashManager = new HashManager();

export class UserBusiness{
    createUser =async (input:userInputDTO) => {
        try{
            const {name, email, password, role} = input;

            if(!name){
                throw new NotNullName()
            }else if(!email){
                throw new NotNullEmail()
            }else if(!password){
                throw new NotNullPassword()
            }else if (!email.includes("@")){
                throw new InvalidEmail()
            }else if(password.length <=6){
                throw new InvalidPassword()
            }else if(!role){
                throw new NotNullRole()
            }

            if(role.toUpperCase() != UserRole.ADMIN && role.toUpperCase() != UserRole.NORMAL){
                throw new InvalidRole()
              }

            const id: string = generateId()

            const hashPassword: string = await hashManager.hash(password);


            const user:user={
                id,
                name,
                email,
                password: hashPassword,
                role
            }

            const userDatabase = new UserDatabase();
            await userDatabase.insertUser(user)

            const token = authenticator.generateToken({id, role})

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

            const userDatabase = new UserDatabase();
            const user = await userDatabase.findUserByEmail(email);

            if(!user){
                throw new UserNotFound()
            }

            const isValidPassword: boolean = await hashManager.compare(
                password,
                user.password
            );

            if(!isValidPassword){
                throw new InvalidPassword();
                
            }

            const token = authenticator.generateToken({id: user.id, role:user.role})

            return token
        }catch(error:any){
            throw new CustomError(400, error.message)
        }
    };


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