"use strict";

function captcha(){
    let numerorandom = Math.floor((Math.random()*10000)+1);
    let valorcaptcha = document.getElementById("captcha");
    valorcaptcha.value = numerorandom;
}

captcha();

function validar(){
    event.preventDefault();
    let captchausuario = document.getElementById("captcha-usuario");
    let inputusuario = captchausuario.value;
    let valorrandom = document.getElementById("captcha").value;

    if (inputusuario == valorrandom){
        alert("Captcha correcto");
    }else{
        alert("Captcha incorrecto");
    }
    captcha();
}

let btn = document.getElementById("enviar");
btn.addEventListener("click", validar);