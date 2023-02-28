import * as jwt from "jsonwebtoken"
import { Authentication } from "../model/authentication"

export class Authenticator {
    public generateToken = ({id}: Authentication):string =>{
        const token = jwt.sign(
            {id},
            process.env.JWT_KEY as string,
            {expiresIn: "5h"}
        )
        return token
    }
}