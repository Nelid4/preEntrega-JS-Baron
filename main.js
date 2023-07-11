
//capturar DOM
let obraDiv = document.getElementById("libros")
let verPinacoteca = document.getElementById("verCatalogo")
let ocultarCatalogo = document.getElementById("ocultarCatalogo")
let selectOrden = document.getElementById("selectOrden")
let agregarObraBtn = document.getElementById("guardarLibroBtn")
let buscador = document.getElementById("buscador")
let coincidencia = document.getElementById("coincidencia")
let modalBodyFavoritos = document.getElementById("modal-bodyCarrito")
let botonCarrito = document.getElementById("botonCarrito")
let precioTotal = document.getElementById("precioTotal")

//--------------------------------------------------MOSTRAR PINACOTECA---------------------------------------------------//
function mostrarObras(array){

   obraDiv.innerHTML = ``

   for(let obra of array ){
      let nuevoLibroDiv = document.createElement("div")

      nuevoLibroDiv.className = "col-12 col-md-6 col-lg-4 my-2"
      nuevoLibroDiv.innerHTML = `<div id="${obra.id}" class="card" style="width: 18rem;">
                                 <img class="card-img-top img-fluid" style="height: 200px;"src="assets/${obra.imagen}" alt="${obra.titulo} de ${obra.artista}">
                                 <div class="card-body">
                                    <h4 class="card-title">${obra.artista}</h4>
                                    <p>Artista: ${obra.titulo}</p>
                                    <p>Año: ${obra.year}</p>
                                 <button id="agregarBtn${obra.id}" class="btn btn-outline-success">Agregar al carrito</button>
                                 </div>
                              </div>`
      obraDiv.appendChild(nuevoLibroDiv)

      let agregarBtn = document.getElementById(`agregarBtn${obra.id}`)

      agregarBtn.addEventListener("click", () => {
         agregarAlCarrito(obra)
      })
   }
}
//------------------------------------------------AGREGAR A FAVORITAS-------------------------------------------------------------------------//
//array con productos en carrito//
let productosEnCarrito 
if(localStorage.getItem("carrito")){
   productosEnCarrito = JSON.parse(localStorage.getItem("carrito"))

}else{
   productosEnCarrito = []
   localStorage.setItem("carrito", productosEnCarrito)
}
///------------------------------------------//
function agregarAlCarrito(obra){

   let obraAgregada = productosEnCarrito.find((elem)=>elem.id == obra.id) 

   if(obraAgregada == undefined){
      productosEnCarrito.push(obra)
      localStorage.setItem("carrito", JSON.stringify(productosEnCarrito))
      console.log(productosEnCarrito)
   }else{
      //sumar uno a cantidad
      console.log(`El libro ${obra.titulo} ya existe en el carrito `)
   }
}
///------------------------------------------//
function cargarProductosCarrito(array){
   modalBodyFavoritos.innerHTML = ``
   array.forEach((productoCarrito)=>{
      modalBodyFavoritos.innerHTML += `
   
         <div class="card border-primary mb-3" id ="productoCarrito${productoCarrito.id}" style="max-width: 540px;">
                  <img class="card-img-top" height="300px" src="assets/${productoCarrito.imagen}" alt="">
                  <div class="card-body">
                        <h4 class="card-title">${productoCarrito.titulo}</h4>
                        <p class="card-text">${productoCarrito.artista}</p>
                        <p class="card-text">Año:${productoCarrito.year}</p> 
                        <button class= "btn btn-danger" id="botonEliminar${productoCarrito.id}"><i class="fas fa-trash-alt"></i></button>
                  </div>    
            </div>
      
   `
   })
   
}

//------------------------------------------------------ORDENAR OBRAS------------------------------------------------------------------//

function ordenarMenorMayor(array){
   const menorMayor = [].concat(array)
   console.log(menorMayor)
   menorMayor.sort((a,b) => a.year - b.year)
   mostrarObras(menorMayor)
 }
 
 function ordenarMayorMenor(array){
   const mayorMenor = [].concat(array)
   mayorMenor.sort((elem1 ,elem2) => elem2.year - elem1.year)
   mostrarObras(mayorMenor)
 }
 
 function ordenarAlfabeticamenteTitulo(array){
   const arrayAlfabetico = [].concat(array)
   arrayAlfabetico.sort( (a,b) =>{
      if (a.titulo > b.titulo) {
         return 1
       }
       if (a.titulo < b.titulo) {
         return -1
       }
       return 0
   })
 
   mostrarObras(arrayAlfabetico)
 }
//--------------------------------------------------AGREGAR OBRAS---------------------------------------------------//
function agregarObra(array){
   let artistaIngresado = document.getElementById("artistaInput")
   let tituloIngresado = document.getElementById("tituloInput")
   let yearIngresado = document.getElementById("yearInput")

   let obraNueva = new Obra(array.length+1, tituloIngresado.value,artistaIngresado.value, yearIngresado.value, "obraIndefinida.jpg")
   //pusheamos al array:
   array.push(obraNueva)
   //setear en el storage el array con el libro
   localStorage.setItem("pinacoteca", JSON.stringify(array))
   mostrarObras(array)
   
   //---RESETEO DE FORM---//
   artistaIngresado.value = ""
   tituloIngresado.value = ""
   yearIngresado.value = ""
}
//-----------------------------------------------BUSCAR OBRAS--------------------------------------------------------//
function buscarInfo(buscado, array){

   let busqueda = array.filter(
      (dato) => dato.artista.toLowerCase().includes(buscado.toLowerCase())  || dato.titulo.toLowerCase().includes(buscado.toLowerCase()) 
   )

   busqueda.length == 0 ? 
   (coincidencia.innerHTML = `<h3>${buscado} no se encuentra en nustro Museo</h3>`,
   mostrarObras(busqueda)) :
   (coincidencia.innerHTML = "", mostrarObras(busqueda)) 
   }

//--------------------------------------------------EVENTOS DEL USUARIO-----------------------------------------------------------//
agregarObraBtn.addEventListener("click", function(event){
   event.preventDefault()
   agregarObra(pinacoteca)
})

verPinacoteca.addEventListener("click", ()=>{
   mostrarObras(pinacoteca)
})

ocultarCatalogo.ondblclick = () => {
   obraDiv.innerHTML = ``
}

selectOrden.addEventListener("change", () => {
   console.log(selectOrden.value)
   switch(selectOrden.value){
      case "1":
         ordenarMayorMenor(pinacoteca)
      break
      case "2":
         ordenarMenorMayor(pinacoteca)
      break
      case "3":
         ordenarAlfabeticamenteTitulo(pinacoteca)
      break
      default:
         mostrarObras(pinacoteca)
      break
   }
}
)
buscador.addEventListener("input", () => {
   buscarInfo(buscador.value, pinacoteca)
})

botonCarrito.addEventListener("click", () => {
   cargarProductosCarrito(productosEnCarrito)
})
