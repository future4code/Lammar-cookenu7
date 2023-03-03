# Cookenu

## O que funciona:
<ol>
    <li>
        <h3><strong> Cadastro do usuário no banco de dados.</strong></h3>
    </li>
    <p>Para realizar o cadastro o usuário precisa informar os seguintes dados:</p>
    <ul>
        <li>Name,</li>
        <li>Email,</li>
        <li>Password (com no mínimo 6 caracteres),</li>
        <li>Role: são aceitos dois tipos <strong>ADMIN</strong> ou <strong>NORMAL</strong> </li>
    </ul>
    <p> Resultado esperado: O usuário recebe uma mensagem que seu cadastro foi realizado e o seu número de token.</p>
    <li>
        <h3><strong> Login do usuário.</strong></h3>
    </li>
    <p> Para realizar o login o usuário precisa informar seu <strong>email e senha<strong> cadastrado. Nessa etapa o usuário também vai receber o seu código de token.
    </p>
    <li>
        <h3><strong> Visualizar os dados da sua própria conta.</strong></h3>
    </li>
    <p>Para ver os dados da sua conta o usuário precisa apenas informar o seu <strong>token</strong>, que é informado ao realizar o login.</p>
    <li>
        <h3><strong> Publicar uma receita.</strong></h3>
    </li>
    <p>Para realizar a publicação o usuário precisa informar o seu token e os seguintes dados:</p>
    <ul>
        <li>Title</li>
        <li>Description</li>
    </ul>
    <li>
        <h3><strong> Publicar uma receita.</strong></h3>
    </li>
    <p>Para realizar a publicação o usuário precisa informar o seu token e os seguintes dados:</p>
    <ul>
        <li>Title</li>
        <li>Description</li>
    </ul>

    
   

</ol>
## O que não funciona:

<ol>
    <li>
        <h3> <strong>Editar uma receita: </strong></h3>
        <p>O usuário consegue editar qualquer receita, e não apenas as que ele criou </p>
    </li>
    <li>
        <h3><strong>Deletar uma receita</strong></h3>
        <p>O usuário com role tipo <strong>normal</strong> não consegue deletar suas próprias receitas</p>
    </li>
</ol>

## Tecnologias utilizadas:
<strong>TypeScript, Node.js, MySQL.</strong>

## Deploy: 

## Documentação: