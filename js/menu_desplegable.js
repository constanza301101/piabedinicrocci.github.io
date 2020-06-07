"use strict";

document.addEventListener("DOMContentLoaded", function(){

    function toggleMenu() {
        document.querySelector(".botoneratexto").classList.toggle("desplegar");
    }

    function toggleSubmenu() {
        document.querySelector(".submenu").classList.toggle("desplegar");
    }

    document.querySelector(".iconomenu").addEventListener("click", toggleMenu);
    document.querySelector("#productos").addEventListener("click", toggleSubmenu);

});