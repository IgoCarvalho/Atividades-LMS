// LLOGIN

let openModalLgButton = document.querySelector("#l-modal-button");
let modalLgOverlay = document.querySelector(".modal-login-overlay");


openModalLgButton.addEventListener("click", function(){
    if(usuarioLogado()){
        localStorage.removeItem("userId");
        this.classList.toggle("btn-entrar-action");
        this.innerHTML = "Login";
        changeCabecalhoName();
    }
    else{
        modalLgOverlay.style.display = "flex";
    }
});

modalLgOverlay.addEventListener("click", function(e){
    if(e.target == this){
        this.style.display = "none";
    }
});


let loginButton = document.querySelector('#lButton');
let loginUserName = document.querySelector('#lUserName');
let cabecalhoUserName = document.querySelector('#cabecalho-user-name');

function usuarioLogado(){
    if(localStorage.userId){
        return true;
    }
    return false;
}


function changeCabecalhoName () {
    if(usuarioLogado()){
        cabecalhoUserName.innerHTML = localStorage.getItem("userId");
        openModalLgButton.classList.toggle("btn-entrar-action");
        openModalLgButton.innerHTML = "Logut";
    }
    else{
        cabecalhoUserName.innerHTML = "";
    }
}
changeCabecalhoName();

function userLogin(userName){
    localStorage.setItem("userId", userName);
    changeCabecalhoName();

}

loginButton.addEventListener('click', function (e) {
    e.preventDefault();
    userLogin(loginUserName.value);
    modalLgOverlay.style.display = "none";
    loginUserName.value = "";
});


let openModalNg = document.querySelector(".criar-grupo button");
let modalNg = document.querySelector(".modal-ng-overlay");

openModalNg.addEventListener("click", function(){
    modalNg.style.display = "flex";
})

modalNg.addEventListener("click", function(e){
    if(e.target == this){
        this.style.display = "none";
    }
});


let listaDeGrupos = document.querySelector(".grupos-lista");
let bate_papo = document.querySelector(".bate-papo");

const urlBase = "http://rest.learncode.academy/api/%E2%80%8Bigolms/";
let urlMensagens = urlBase;
let url = "http://rest.learncode.academy/api/%E2%80%8Bigolms/grupos";

function postGrupos(grupoName, grupoId) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 ) {
            ngName.value = "";
            ngId.value = "";
            getGrupos();
        }
    }
    xhttp.open("POST", url , true);
    xhttp.setRequestHeader("Content-type", "application/json");
    let item = {
        grupoName: grupoName,
        grupoId: grupoId
    }
    xhttp.send(JSON.stringify(item));

}

function getGrupos() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            let grupos = JSON.parse(this.responseText);
            listaDeGrupos.innerHTML = "";

            for (let i = 0; i < grupos.length; i++) {
                criaGrupo(grupos[i]);
            }
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

getGrupos();

function criaGrupo(grupoObj) {
    let grupo = document.createElement("DIV");
    grupo.classList.add("grupo");
    let img_grupo = document.createElement("DIV");
    img_grupo.classList.add("img-grupo");
    let img = document.createElement("IMG");
    img.src = "./Image/group-image.png";
    nome_grupo = document.createElement("h2");
    nome_grupo.classList.add("nome-grupo");
    nome_grupo.innerHTML = grupoObj.grupoName;

    img_grupo.appendChild(img);
    grupo.appendChild(img_grupo);
    grupo.appendChild(nome_grupo);

    grupo.addEventListener("click", function () {
        urlMensagens = urlBase + grupoObj.grupoId;
        mudaNomeCabecalho(grupoObj.grupoName);
        getMensagens(urlMensagens);
        grupoSelecionado(this);
    })

    listaDeGrupos.appendChild(grupo);
}


let ngName = document.querySelector('#nGroupName');
let ngId = document.querySelector('#nGroupId');
let ngbutton = document.querySelector('#ngButton');

ngButton.addEventListener('click', function (e) {
    e.preventDefault();
    postGrupos(ngName.value, ngId.value);
    modalNg.style.display = "none";
    
});

function getMensagens(){
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4){   
            mostraMenssages(JSON.parse(this.responseText));
        }
    }

    xhttp.open("GET", urlMensagens, true);
    xhttp.send();

}

function postMensagens(urlMensagens, userName, mensagem){
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4){
            newMsg.value = "";
            getMensagens();
        }
    }

    xhttp.open("POST", urlMensagens, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    let item = { usuarioNome: userName, usuarioMsg: mensagem }
    xhttp.send(JSON.stringify(item));

}

function gerarMsg(nomeUsuario, mensagem) {
    let balao_mensagem = document.createElement("DIV");
    balao_mensagem.classList.add("balao-msg");
    let conteudo = '<div class="balao-msg">' +
        '<h3 class="dono-msg">' + nomeUsuario + '</h3>' +
        '<p class="conteudo-msg">' + mensagem + '</p>' +
        '</div>';

    balao_mensagem.innerHTML = conteudo
    return conteudo;
}


function mostraMenssages(mensagens) {
    let msg = "";
    let area_msg = bate_papo.querySelector(".area-msg");
    
    for (let i = 0; i < mensagens.length; i++) {
        let item = gerarMsg(mensagens[i].usuarioNome, mensagens[i].usuarioMsg);
        msg += item;
    }
    area_msg.innerHTML = msg;

}

function mudaNomeCabecalho(nomeGrupo){
    let bate_papo_nome = bate_papo.querySelector(".cabecalho-msg h2");
    bate_papo_nome.innerHTML = nomeGrupo;
}

function grupoSelecionado(grupo) {
    let grupos = document.querySelectorAll(".grupo")
    grupo.classList.toggle("grupo-selecionado");

    for (let gp of grupos) {
        if (gp != grupo) {
            gp.classList.remove("grupo-selecionado");
        }
    }

}

function checkUrlMensages(){
    if(urlMensagens != urlBase){
        return true;
    }
    return false;
}


let btnEviarMsg = document.querySelector('#btn-new-msg');
let newMsg = document.querySelector('#new-msg');
let nomeDoUsuario = "";

btnEviarMsg.addEventListener('click', function (e) {
    e.preventDefault();
    if(usuarioLogado()){
        nomeDoUsuario = localStorage.getItem("userId");
    }else{
        nomeDoUsuario = "Usuário anônimo";
    }
    if(checkUrlMensages()){
        postMensagens(urlMensagens, nomeDoUsuario, newMsg.value);
    }else{
        alert("Por favor selecione um grupo para enviar a mensagem")
    }

});
