"use strict"

let url = 'https://web-unicen.herokuapp.com/api/groups/028_bedini_caseres/carro';

traerDatos();

let carrito_compras = [{"id":1,"thing":{ }}];

let tabla = document.querySelector("#tabla");

let idActualizar;

let headTable = tabla.innerHTML;

function agregarDato(numero_de_veces){
  //traer los datos de los inputs
  let producto = document.getElementById("area1").value;
  let descripcion = document.getElementById("area2").value;
  let cantidad = document.getElementById("area3").value;
  let precio = document.getElementById("area4").value;

  let dato = {
    "thing": {
    "producto": producto,
    "descripcion": descripcion,
    "cantidad": cantidad,
    "precio": precio
    }
  };

  if (((dato.thing.producto === "")||(dato.thing.descripcion === "")||(dato.thing.cantidad === ""))||(dato.thing.precio === "")) {
    alert("Por favor complete todos los campos.");
    return false;
  }
  
  for(let i = 0; i < numero_de_veces; i++){
    subirDato(dato.thing);
  }
}

async function subirDato(pedido) {
    
  let data = {
    "thing": {
      "producto": pedido.producto,
      "descripcion": pedido.descripcion,
      "cantidad": pedido.cantidad,
      "precio": pedido.precio,
    }
  };
  
  try {
    await fetch(url, {
      "method": "POST",
      "headers": {
        "Content-Type": "application/json"
      },
      "body": JSON.stringify(data),
    });
    traerDatos();
  }
  catch (t) {
    console.log(t);
  }
}

async function traerDatos(){
  try {
    let recibido = await fetch(url); 
    let json = await recibido.json();
    carrito_compras = [];
    if(json.carro.length > 0){        
      for(let i = 0; i < json.carro.length; i++){
        let id = json.carro[i]._id;
        let thing = json.carro[i].thing;
        carrito_compras.push({id,thing});
      }
    }
    mostrarDatos();
    //console.log("Aca traje los datos realmente: ",carrito_compras);
  }
  catch(t){
    console.log(t);
  }

}

function mostrarDatos(){
  //vacio la tabla
  tabla.innerHTML = headTable;
    
  for(let i = 0; i < carrito_compras.length; i++){
    agregarFilaTabla(carrito_compras[i]);
  }
}

function crearBotonBorrar(id) {
  let button = document.createElement("button");
  button.textContent = "Borrar";
  button.addEventListener("click", function () {
    borrarDato(id);
  })
  return button;
}

function agregarFilaTabla(dato) {
  
  let row = document.createElement("tr");
  row.setAttribute("id",dato.id);

  let producto = document.createElement("td");
  producto.textContent = dato.thing.producto;

  let descripcion = document.createElement("td");
  descripcion.textContent = dato.thing.descripcion;

  let cantidad = document.createElement("td");
  cantidad.textContent = dato.thing.cantidad;

  let precio = document.createElement("td");
  precio.textContent = dato.thing.precio;

  let tdOpciones = document.createElement("td");
  tdOpciones.classList.add("excepcion");
  
  let botonBorrar = crearBotonBorrar(dato.id);
  let botonEditar = crearBotonEditar(dato,botonBorrar);

  tdOpciones.appendChild(botonBorrar);
  tdOpciones.appendChild(botonEditar);

  row.appendChild(producto);
  row.appendChild(descripcion);
  row.appendChild(cantidad);
  row.appendChild(precio);
  row.appendChild(tdOpciones);
  tabla.appendChild(row);

  resaltarFilas();
}

async function borrarTodo(){
  try {
    let recibido = await fetch(url);
    let json = await recibido.json();
    carrito_compras = [];
    if(json.carro.length > 0){        
      for(let i = 0; i < json.carro.length; i++){
        let id = json.carro[i]._id;
        console.log(id);
        borrarDato(id);
      }
    }
  }
  catch(t){
    console.log(t);
  }
}

async function borrarDato(id) {
  try {
    await fetch(url + "/" + id, {
    "method": "DELETE",
    });
    traerDatos();
  }
  catch (t) {
    console.log(t);
  }
}

function crearBotonEditar(dato,botonBorrar) {
  let botonActualizar = document.querySelector("#btnActualizar");
  let botonAgregar = document.querySelector("#btnAgregar");
  let botonCargar3 = document.querySelector("#btncargar3");
  let botonBorrarTodo = document.querySelector("#btnBorrarTodo");
  let botonFiltrar = document.querySelector("#filtrar");
  let botonVerTodo = document.querySelector("#VerTodo");

  let button = document.createElement("button");
  button.textContent = "Editar";

  button.addEventListener("click", function () {
    botonBorrar.disabled = true;
    botonAgregar.disabled = true;
    botonCargar3.disabled = true;
    botonBorrarTodo.disabled = true;
    botonFiltrar.disabled = true;
    botonVerTodo.disabled = true;
    this.disabled = true;
    botonActualizar.disabled = false;

    //traer los datos de los inputs
    let producto = document.getElementById("area1");
    let descripcion = document.getElementById("area2");
    let cantidad = document.getElementById("area3");
    let precio = document.getElementById("area4");

    producto.value = dato.thing.producto;
    descripcion.value = dato.thing.descripcion;
    cantidad.value = dato.thing.cantidad;
    precio.value = dato.thing.precio;

    idActualizar = dato.id;
  });

  return button;
}

async function editarDato(pedido, id) {
  let data = {
    "thing": {
      "producto": pedido.producto,
      "descripcion": pedido.descripcion,
      "cantidad": pedido.cantidad,
      "precio": pedido.precio,
    }
  };
  try {
    await fetch(url + "/" + id, {
      "method": "PUT",
      "headers": {
      "Content-Type": "application/json"
      },
      "body": JSON.stringify(data),
    });
    traerDatos();
  }
  catch (t) {
    console.log(t);
  }
}

function filtro() {
  let filtro = document.getElementById("filtro").value;
  tabla.innerHTML = headTable;
  for (let i = 0; i < carrito_compras.length; i++) {
    let producto = carrito_compras[i].thing.producto;
    if (producto.includes(filtro)) {
      agregarFilaTabla(carrito_compras[i])
    }
  }
}

function resaltarFilas() {
  let precioMaximo = 200;
  let table = document.getElementById("tabla").getElementsByTagName("tr");
  //console.log(table.length);
  for (let i = 0; i < table.length; i++) {
    let columnas = table[i].getElementsByTagName("td");
    for (let j = 3; j < columnas.length; j=j+3) {
    let celda = columnas[j];
      if (parseInt(celda.textContent) <= precioMaximo) {
        table[i].classList.add("resaltar");
      }
    }
  }
}

document.querySelector("#btnAgregar").addEventListener('click', function(){
  event.preventDefault();
  agregarDato(1);
  resaltarFilas();
});

document.querySelector("#btncargar3").addEventListener('click', function(){
  event.preventDefault();
  agregarDato(3);
});

document.querySelector("#btnBorrarTodo").addEventListener('click', function(){
  event.preventDefault();
  borrarTodo()
});

document.querySelector("#btnActualizar").addEventListener("click",function(){
  event.preventDefault();

  let botonAgregar = document.querySelector("#btnAgregar");
  let botonCargar3 = document.querySelector("#btncargar3");
  let botonBorrarTodo = document.querySelector("#btnBorrarTodo");
  let botonFiltrar = document.querySelector("#filtrar");
  let botonVerTodo = document.querySelector("#VerTodo");

  //traer los datos de los inputs
  let producto = document.getElementById("area1");
  let descripcion = document.getElementById("area2");
  let cantidad = document.getElementById("area3");
  let precio = document.getElementById("area4");

  let dato = {
    "producto":producto.value,
    "descripcion":descripcion.value,
    "cantidad":cantidad.value,
    "precio":precio.value
  }

  editarDato(dato,idActualizar);
  
  producto.value = "";
  descripcion.value = "";
  cantidad.value = "";
  precio.value = "";

 let row = document.getElementById(idActualizar);
  this.disabled = true;
  botonAgregar.disabled = false;
  botonCargar3.disabled = false;
  botonBorrarTodo.disabled = false;
  botonFiltrar.disabled = false;
  botonVerTodo.disabled = false;

  let buttons = row.cells[row.cells.length -1].childNodes;
  buttons[0].disabled = false;
  buttons[1].disabled = false;
});

document.getElementById("filtrar").addEventListener("click",function(){
  event.preventDefault()
  filtro();
});

document.getElementById("VerTodo").addEventListener("click",function(){
  event.preventDefault();
  mostrarDatos();
});