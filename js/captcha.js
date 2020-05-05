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
    let mensaje = document.getElementById("alerta");
    let aviso = document.getElementById("alerta")

    if (inputusuario == valorrandom){
        aviso.innerHTML = "Captcha correcto.";
        return false;
    }else{
        aviso.innerHTML = "Captcha incorrecto, intente nuevamente.";
    }
    captcha();
}

let btn = document.getElementById("enviar");
btn.addEventListener("click", validar);