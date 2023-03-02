import { Response } from "express";
import { CustomError } from "../error/CustomError";
import { Unauthorized, UserNotFound } from "../error/UserError";
import { Follow } from "../model/follow/follow";
import { user } from "../model/user/user";
import { Authenticator } from "../services/Authenticator";
import { BaseDatabase } from "./BaseDatabase";
import {getUserDTO} from "../model/user/getUserDTO."

const authenticator = new Authenticator()

export class UserDatabase extends BaseDatabase{
    insertUser = async(user:user):Promise<void>=>{
        try{
            await UserDatabase.connection
            .insert({
                id: user.id,
                name: user.name,
                email: user.email,
                password: user.password,
                role: user.role
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

    getUser = async(token: string)=>{
        try{
            const {id} = authenticator.getTokenData(token)

            const queryResult = await UserDatabase.connection("User_Cookenu")
            .select("id", "name", "email")
            .where({id})

            if(queryResult.length <1){
                throw new UserNotFound
            }
            return queryResult
        }catch(error:any){
            throw new CustomError(error.statusCode, error.message)
        }
    }

    createFollow = async(follow:Follow):Promise<void>=>{
        try{
            const queryResult = await UserDatabase.connection
            .insert({
                id: follow.id,
                id_followed: follow.id_followed,
                id_following: follow.id_following
            }).into("Follow_Cookenu")

            if(queryResult.length <1){
                throw new Unauthorized();
            }

        }catch(error:any){
            throw new Error(error.message)
        }
    }

    unfollow = async(follow: Follow):Promise<void>=>{
        try{
            await UserDatabase.connection("Follow_Cookenu")
            .delete()
            .where({
                id_followed: follow.id_followed,
                id_following: follow.id_following
            })

        }catch(error:any){
            throw new Error(error.message)
        }
    }


    getFeed = async(token: string)=>{
        try{
            const {id} = authenticator.getTokenData(token)

            const queryResult = await UserDatabase.connection.raw(
                `Select r.id, r.title, r.description, r.creation_date, u.id, u.name 
                from Recipes_Cookenu AS r 
                inner join User_Cookenu u ON u.id = r.author_id 
                inner join Follow_Cookenu fo on fo.id_followed = u.id 
                WHERE fo.id_following = "${id}"`
            )

            if(queryResult.length <1){
                throw new UserNotFound
            }
            return queryResult
        }catch(error:any){
            throw new CustomError(error.statusCode, error.message)
        }
    }

}