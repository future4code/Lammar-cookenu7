<h1 align="center">🥘 Cookenu - Rede social de receitas </h1>

<h3>✔️ O que funciona:</h3>
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
    <p> Para realizar o login o usuário precisa informar seu <strong>email e senha</strong> cadastrado. Nessa etapa o usuário também vai receber o seu código de token.
    </p>
    <li>
        <h3><strong> Visualizar os dados da sua própria conta.</strong></h3>
    </li>
    <p>Para ver os dados da sua conta o usuário precisa apenas informar o seu <strong>token</strong> via headers. O mesmo é informado toda vez que ele realiza o login, pois tem validação de apenas 5 horas.</p>
    <li>
        <h3><strong> Publicar uma receita.</strong></h3>
    </li>
    <p>Para realizar a publicação o usuário precisa informar o seu token e os seguintes dados:</p>
    <ul>
        <li>Title</li>
        <li>Description</li>
    </ul>
    <li>
        <h3><strong> Visualizar uma receita.</strong></h3>
    </li>
    <p>O usuário precisa informar o seu token e e o id correto da receita (via params)</p>
    <li>
        <h3><strong> Seguir um usuário</strong></h3>
    </li>
    <p>O usuário precisa informar o seu token via headers e o id do usuário que deseja seguir via body.</p>
    <li>
        <h3><strong> Deixar de seguir um usuário</strong></h3>
    </li>
    <p>O usuário precisa informar o seu token via headers e o id do usuário que deseja parar de seguir via body.</p>
    <li>
        <h3><strong> Feed com as receitas das pessoas que o usuário segue.</strong></h3>
    </li>
    <p> O usuário tem acesso ao feed, ontem é possivel ver as receitas de todas as pessoas que ele segue, basta informar seu token.</p>
    <li>
        <h3><strong> Deletar receita</strong></h3>
    </li>
    <p> Até o momento apenas o usuário com a role do tipo <strong>ADMIN</strong> tem permissão para deletar as contas.</p>
</ol>

<h3> ⛔ O que não funciona:</h3>

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

<h3> Tecnologias utilizadas:</h3>
<strong>TypeScript, Node.js, MySQL.</strong>

<h3> Deploy:</h3> <p>https://cookenu7.onrender.com</p>

<h3> Documentação:</h3>
