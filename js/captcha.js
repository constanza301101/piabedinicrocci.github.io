"use strict";

document.addEventListener("DOMContentLoaded", function(){

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
        let aviso = document.getElementById("alerta");

        if (inputusuario == valorrandom){
            aviso.innerHTML = "Captcha correcto.";
            return false;
        }else{
            aviso.innerHTML = "Captcha incorrecto, intente nuevamente.";
        }
        captcha();
    }

    let formulario = document.getElementById("formulario_registro");
    formulario.addEventListener("submit", validar);

});