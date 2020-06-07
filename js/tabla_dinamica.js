"use strict";

document.addEventListener("DOMContentLoaded", function(){

    function colorearFilas() {
        let precioMinimo = 200;
        let tabla = document.getElementById("tabla").getElementsByTagName("tr");
        console.log(table.length);
        for (let i = 0; i < table.length; i++) {
          let columnas = table[i].getElementsByTagName("td");
          for (let j = 3; j < columnas.length; j=j+3) {
            let celda = columnas[j];
            if (parseInt(celda.textContent) >= precioMinimo) {
                table[i].classList.toggle("colorear");
              }
          }
        }
      }

    let compras_usuario = [
        {
            "producto": " Aros",
            "descripcion": "AQ",
            "cantidad": parseInt("1"),
            "precio": parseInt("140"),
        },
        {
            "producto": "Collar",
            "descripcion": "Metal",
            "cantidad": parseInt("3"),
            "precio": parseInt("230"),
        }
    ];
   
    function agregar(event){  
        event.preventDefault();
        let nueva_compra = {
            "producto": document.getElementById("area1").value,
            "descripcion": document.getElementById("area2").value,
            "cantidad": document.getElementById("area3").value,
            "precio": document.getElementById("area4").value
        };
        if (((nueva_compra.producto === "")||(nueva_compra.descripcion === "")||(nueva_compra.cantidad === ""))||(nueva_compra.precio === "")) {
            alert("Por favor complete todos los campos.");
            return false;
          }
        compras_usuario.push(nueva_compra);
        mostrarTabla();
        colorearFilas();
    }

    function borrar(indice){
        compras_usuario.splice (indice, 1);
        mostrarTabla();
        colorearFilas();   
    }

    function borrarTodo(lista){
        event.preventDefault();
        compras_usuario.splice(0, 100);
        mostrarTabla();  
    }

    function mostrarTabla(){
        let lista = document.getElementById("tabla");
        lista.innerHTML = '';
        for(let i=0; i< compras_usuario.length; i++){
            lista.innerHTML += ` <tr>
            <td id="1" >${compras_usuario[i].producto}
            <td id="2" >${compras_usuario[i].descripcion}
            <td id="3" >${compras_usuario[i].cantidad}
            <td id="4" >${compras_usuario[i].precio}
            <td class="excepcion">
            <button class="btnBorrar" >borrar</button>
            </tr> `;
        }
        let botones = document.querySelectorAll(".btnBorrar");
        for(let b =0; b<botones.length; b++){
            botones[b].addEventListener("click", function () {
                borrar(b)});
        }  
    }

    function cargarTres(){
        agregar(event);
        agregar(event);
        agregar(event);
    }

    function colorearFilas() {
        let precioMaximo = 200;
        let table = document.getElementById("tabla").getElementsByTagName("tr");
        console.log(table.length);
        for (let i = 0; i < table.length; i++) {
          let columnas = table[i].getElementsByTagName("td");
          for (let j = 3; j < columnas.length; j=j+3) {
            let celda = columnas[j];
            if (parseInt(celda.textContent) <= precioMaximo) {
                table[i].classList.toggle("colorear");
              }
          }
        }
      }
    
    let boton = document.getElementById("btnAgregar");
    boton.addEventListener('click', agregar);
    let botoncargar3 = document.getElementById("btncargar3");
    botoncargar3.addEventListener('click', cargarTres);
    let boton_borartodo = document.getElementById("btnBorrarTodo");
    boton_borartodo.addEventListener('click', borrarTodo);

    mostrarTabla();
    colorearFilas();
   
});