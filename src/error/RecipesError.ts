import { CustomError } from "./CustomError";

export class NotNullTitle extends CustomError{
    constructor(){
        super(400, "Favor preencha o campo titulo.")
    }
}
export class NotNullDescription extends CustomError{
    constructor(){
        super(400, "Favor preencha o campo descrição.")
    }
}

export class NotNullAuthor_id extends CustomError{
    constructor(){
        super(400, "Favor preencha o campo id do author.")
    }
}