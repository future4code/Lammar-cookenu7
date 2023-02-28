import { CustomError } from "./CustomError";

export class NotNullName extends CustomError{
    constructor(){
        super(400, "Favor preencha o campo nickname.")
    }
}
export class NotNullEmail extends CustomError{
    constructor(){
        super(400, "Favor preencha o campo email.")
    }
}
export class InvalidEmail extends CustomError{
    constructor(){
        super(400, "Favor insira um e-mail válido.")
    }
}
export class NotNullPassword extends CustomError{
    constructor(){
        super(404, "Favor preencha o campo password.")
    }
}

export class InvalidPassword extends CustomError{
    constructor(){
        super(400, "A senha precisa ter mais de 6 caracteres.")
    }
}

export class PasswordIncorrect extends CustomError{
    constructor(){
        super(400, "Senha inválida")
    }
} 

export class UserNotFound extends CustomError{
    constructor(){
        super(400, "Usuário não localizado.")
    }
}