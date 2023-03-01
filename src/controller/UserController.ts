import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { UserDatabase } from "../data/UserDataBase";
import { CustomError } from "../error/CustomError";
import { login } from "../model/login";
import { userInputDTO } from "../model/userDTO";

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

            const userDatabase = new UserDatabase()
            const user = await userDatabase.getUser(token)
            console.log(token)

            res.status(201).send(user[0])
        }catch(error:any){
            throw new CustomError(error.statusCode, error.message);
        }
    }
}