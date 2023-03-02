import * as jwt from "jsonwebtoken"
import { Unauthorized } from "../error/UserError"
import { Authentication } from "../model/user/authentication"


export class Authenticator {
    public generateToken = ({id, role}: Authentication):string =>{
        const token = jwt.sign(
            {id, role},
            process.env.JWT_KEY as string,
            {expiresIn: "5h"}
        )
        return token
    }

    getTokenData = (token:string):Authentication=>{
        try{
            const payload = jwt.verify(token, process.env.JWT_KEY as string) as Authentication
            return payload

        }catch(error:any){
            throw new Unauthorized()
        }
    }
}