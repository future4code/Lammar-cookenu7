import * as jwt from "jsonwebtoken"
import { authentication } from "../model/authentication";

export class Authenticator {
    public generateToken = ({id}: authentication):string =>{
        const token = jwt.sign(
            {id},
            process.env.JWT_KEY as string,
            {expiresIn: "5h"}
        )
        return token
    }
}