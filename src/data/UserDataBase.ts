import { CustomError } from "../error/CustomError";
import { user } from "../model/user";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase{
    insertUser = async(user:user):Promise<void>=>{
        try{
            await UserDatabase.connection
            .insert({
                id: user.id,
                name: user.name,
                email: user.email,
                password: user.password
            }).into("User_Cookenu")
        }catch(error:any){
            throw new Error(error.message)
        }
    }

    findUserByEmail = async(email: string) =>{
        try{
            const result = await UserDatabase.connection("User_Cookenu")
            .select().where({email})

            return result[0]
        }catch(error:any){
            throw new CustomError(400, error.message)
        }
    }
}