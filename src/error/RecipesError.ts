import { CustomError } from "./CustomError";

export class NotNullTitle extends CustomError{
    constructor(){
        super(404, "Favor preencha o campo titulo.")
    }
}
export class NotNullDescription extends CustomError{
    constructor(){
        super(404, "Favor preencha o campo descrição.")
    }
}
