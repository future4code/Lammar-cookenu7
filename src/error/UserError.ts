import { CustomError } from "./CustomError";

export class InvalidEmail extends CustomError{
    constructor(){
        super(400, "Favor insira um e-mail válido.")
    }
}

export class InvalidPassword extends CustomError{
    constructor(){
        super(400, "A senha precisa ter mais de 6 caracteres.")
    }
}

export class InvalidRole extends CustomError{ 
    constructor(){
        super(400, "Tipo de usuário inválido")
    }
}

export class NotNullEmail extends CustomError{
    constructor(){
        super(400, "Favor preencha o campo email.")
    }
}
export class NotNullIdFollow extends CustomError{
    constructor(){
        super(400, "Favor inserir o id do usuário que deseja seguir.")
    }
}
export class NotNullName extends CustomError{
    constructor(){
        super(400, "Favor preencha o campo nickname.")
    }
}
export class NotNullPassword extends CustomError{
    constructor(){
        super(404, "Favor preencha o campo password.")
    }
}
export class NotNullRole extends CustomError{
    constructor(){
        super(404, "Favor preencha o campo role.")
    }
}

export class NotNullToken extends CustomError{
    constructor(){
        super(400, "Favor insira o token do usuário.")
    }
}
export class PasswordIncorrect extends CustomError{
    constructor(){
        super(400, "Senha inválida")
    }
} 
export class Unauthorized extends CustomError{ 
    constructor(){
        super(401, "Usuário não autorizado")
    }
}
export class UserNotFound extends CustomError{
    constructor(){
        super(404, "Usuário não localizado.")
    }
}