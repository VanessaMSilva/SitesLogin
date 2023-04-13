window.onload = function () {
    //Pega o batao para verificar o dado e ficar olhando para ver se acontece algum click e vai para funcao verifica
    const botao = document.querySelector("#verificar");
    botao.addEventListener("click", verifica);

    //Pega o batao para limpar o dado e ficar olhando para ver se acontece algum click e vai para funcao limpar
    const botao1 = document.querySelector("#limpar");
    botao1.addEventListener("click", limpar);

    //Pega o batao para alterar o dado e ficar olhando para ver se acontece algum click e vai para funcao limpar
    const botao2 = document.querySelector("#alterar");
    botao2.addEventListener("click", limpar);
}

//Inicializa a pagina so que com os dados ja cadastrados
function limpar() {
    //pega os elementos botao de enviar, alterar e limpar para esconde-los
    const vis = document.querySelectorAll(".f1");
    //pega os elementos span para deixar eles vazios

    //Selecionar a div que contem as informações
    const div = document.querySelector("#dados");

    //Selecionar o ultimo filho da div
    var filho = div.lastElementChild;

    //Apagar todos os filhos da div
    while(filho){
        div.removeChild(filho);
        filho = div.lastElementChild;
    }

    for (i = 0; i < vis.length; i++) {
        vis[i].style.visibility = 'hidden';
    }
    abilitar();
}

//Essa funcao daixa que os inputs possam ser alterados
function abilitar() {
    //pergar o botao de verificacao
    const botao = document.querySelector("#verificar");
    //Pegar os campos text para a verificação
    const campos = document.querySelectorAll(".required");
    //Pegar o input do tipo radio
    const sexo = document.getElementsByName("sexo");
  


    //Tirar o contorno das bordas 
    for (i = 0; i < campos.length; i++) {
        campos[i].style.border = '1px solid white';
    }

    //pegar o fieldset de onde esta localizado os radios
    const fiel = document.querySelector("#sexo");
    //Tirar contorno borda
    fiel.style.border = '1px solid white';


    //Abilitar a edição dos dados de contato
    campos[0].removeAttribute('disabled');
    campos[1].removeAttribute('disabled');
    campos[2].removeAttribute('disabled');
    sexo[0].removeAttribute('disabled');
    sexo[1].removeAttribute('disabled');
    botao.removeAttribute('disabled');
}

//Faz a verificação dos requisitos
function verifica() {
    const botao = document.querySelector("#verificar");
    //Pegar os campos para a verificação
    const campos = document.querySelectorAll(".required");
    //Pegar os campos spans 1-fica no fieldeset de sexo e os outros sao para escrever a msg verificada
    const span = document.querySelectorAll("span");
    //Pegar checkbok
    const check = document.querySelector("#Termos");



    var ver = true;
    //-------Verifica se as informações estao certas e preenchidas-----------------
    //if para verificar se o nome contem espaco e consequentemente possui sobrenome
    if (campos[0].value.includes(" ") == false) {
        ver = false;
        erro(campos[0], "name", "Necessario preencher o nome completo");
    } else {
        valida(campos[0], "name","Digite seu nome");
    }

    //if para verificar se o email contem @ e um ponto, consequentemente é um email valido
    if (campos[1].value.includes("@") == false && campos[1].value.includes(".") == false) {
        ver = false;
        erro(campos[1], "email", "Formato de e-mail invalido!!");
    } else {
        valida(campos[1], "email","Digite seu email");
    }

    //verifica se o text area possui mensagens
    if (campos[2].value.includes(" ") == false) {
        ver = false;
        erro(campos[2], "textArea", "Necessario deixar uma mansagem");
    } else {
        valida(campos[2], "textArea","Digite sua mensagem");
    }

    //pega os radios
    const sexo = document.getElementsByName("sexo");

    //Verifica se o radio esta marcado se nao a cor da borda muda para vermelho se sim ele muda para verde
    if (sexo[0].checked || sexo[1].checked) {
        const fiel = document.querySelector("#sexo");
        fiel.style = "border: 3px solid green";
        span[0].textContent = '';
    } else {
        ver = false;
        const fiel = document.querySelector("#sexo");
        span[0].textContent = 'É preciso marcar o seu sexo';
        span[0].style = "color: red";
        fiel.style = "border: 3px solid red";
    }

    //Mostra o formulario e os botoes de alterar, enviar, e limpar caso a verificacao seja valida
    if (ver) {
        const modal = document.querySelector("#meuModal");
        modal.style.visibility = "visible";
        const vis = document.querySelectorAll(".f1");
        //mostra botoes e as informacoes digitadas
        for (i = 0; i < vis.length; i++) {
            vis[i].style.visibility = 'visible';
        }

        //Colocaas informações dos campos e radio
        informacoesValidas('Nome: ' + campos[0].value);
        informacoesValidas('E-mail: ' + campos[1].value);
       
        if (sexo[0].checked) {
            informacoesValidas('Sexo: ' + sexo[0].value);
        } else {
            informacoesValidas('Sexo: ' + sexo[1].value);
        }

        informacoesValidas('Mensagem:' + campos[2].value);

        //Verifica se esta abilitado o recebimento de email
        if(check.checked){
            informacoesValidas('Esta habilitado o recebimento de e-mails');
        }else{
            informacoesValidas('Não esta habilitado o recebimento de e-mails');
        }

        v = false;

        //Desabilita a edição dos dados de contato
        campos[0].setAttribute("disabled", "");
        campos[1].setAttribute("disabled", "");
        campos[2].setAttribute("disabled", "");
        sexo[0].setAttribute("disabled", "");
        sexo[1].setAttribute("disabled", "");
        botao.setAttribute("disabled", "");
    }

}

//Troca a cor e manda mensagem de acordo com a escolha
function erro(campo, n, men) {
    campo.value = ""; //Limpa o campo
    campo.style = "border: 3px solid red";
    document.getElementById(n).placeholder = men;
    
   // place.style = "color: red";
}

//Coloca a borda verde para informações validas
function valida(campo, n,men) {
    document.getElementById(n).placeholder = men;
    campo.style = "border: 3px solid green";
}

function informacoesValidas(texto){
   
    const field = document.querySelector("#dados");
    const novoDiv = document.createElement("div");
    const novoSpan = document.createElement("span");

    //Adicionar elemento
    novoSpan.textContent = texto;

    novoDiv.appendChild(novoSpan);
    field.appendChild(novoDiv);
}