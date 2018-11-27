// MOSTRAR LOGIN

let btn_login = document.querySelector(".drop-login");
let menu_login = document.querySelector(".menu-login");

btn_login.addEventListener("click", function () {
    console.log("iui");
    menu_login.classList.toggle("menu-login-visivel");
});

//MOSTRAR INFORMAÇÕES

btn_informacoes = document.querySelector("[value=Informações]");

let overlayInfo = document.querySelector(".overlayInfo"); 
let btn_fechar = document.querySelector(".btn-fechar");

btn_informacoes.addEventListener("click", function(){
    overlayInfo.style.display = "block";
})

btn_fechar.addEventListener("click", function(){
    overlayInfo.style.display = "none";
})


// CHAT

let btn_titulo = document.querySelector(".titulo");
let conteudo = document.querySelector(".conteudo");
let btn_chat = document.querySelector("#btn-chat");
let chat = document.querySelector(".chat");


btn_titulo.addEventListener("click", function(){
    conteudo.classList.toggle("show");
})

btn_chat.addEventListener("click", function(){
    chat.style.bottom = "0px";
})