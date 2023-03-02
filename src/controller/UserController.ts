import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { UserDatabase } from "../data/UserDataBase";
import { CustomError } from "../error/CustomError";
import { NotNullToken } from "../error/UserError";
import { FollowInputDTO } from "../model/follow/followDTO";
import { login } from "../model/user/login";
import { userInputDTO } from "../model/user/userDTO";

export class UserController{
    createUser = async (req: Request, res: Response) =>{
        try{
            const input: userInputDTO={
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
            };

            const userBusiness = new UserBusiness()
            const token = await userBusiness.createUser(input)
            
            res.status(201).send({message: "Usuário criado com sucesso", token})
        }catch(error:any){
            res.status(400).send(error.message || error.sqlMessage)
        }
    }

    login = async (req: Request, res:Response) =>{
        try{
            const {email, password} = req.body;

            const input: login ={
                email,
                password
            };

            const userBusiness = new UserBusiness();
            const token = await userBusiness.login(input)

            res.status(200).send({token})
        }catch(error:any){
            res.status(400).send(error.message)
        }
    }

    getUser = async(req: Request, res:Response)=>{
        try{
            const token = req.headers.authorization as string

            if(!token){
                throw new NotNullToken()
            }

            const userDatabase = new UserDatabase()
            const user = await userDatabase.getUser(token)

            res.status(201).send(user[0])
        }catch(error:any){
            throw new CustomError(error.statusCode, error.message);
        }
    }

    createFollow = async (req: Request, res: Response) =>{
        try{
            const input: FollowInputDTO={
                id_followed: req.body.id_followed,
                token: req.headers.authorization as string
            };

            const userBusiness = new UserBusiness()
            await userBusiness.createFollow(input)  
            
            res.status(201).send({message: "Followed successfully"})
        }catch(error:any){
            res.status(400).send(error.message || error.sqlMessage)
        }
    }

    unfollow = async (req: Request, res: Response) =>{
        try{
            const input: FollowInputDTO={
                id_followed: req.body.id_followed,
                token: req.headers.authorization as string
            };

            const userBusiness = new UserBusiness()
            const token = await userBusiness.unfollow(input)  
            
            res.status(201).send({message: "Unfollowed successfully"})
        }catch(error:any){
            res.status(400).send(error.message || error.sqlMessage)
        }
    } 

    getFeed = async(req: Request, res:Response)=>{
        try{
            const token = req.headers.authorization as string

            if(!token){
                throw new NotNullToken()
            }

            const userDatabase = new UserDatabase()
            const user = await userDatabase.getFeed(token)

            if(user[0].length < 1){
                res.status(200).send({message: `Seus amigos ainda não postaram nenhuma receita.`})
            }

            res.status(200).send(user[0])
        }catch(error:any){
            throw new CustomError(error.statusCode, error.message);
        }
    }
}