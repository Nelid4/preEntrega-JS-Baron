//CLASS CONSTRUCTORA
class Obra{
    constructor(id, artista, titulo, year, imagen){
    this.id = id,
    this.titulo = titulo,
    this.artista = artista,
    this.year = year
    this.imagen = imagen
    }

    mostrarInfoObra(){
        console.log(`La obra se titula ${this.titulo}, es de ${this.artista} y fué hecha en ${this.year}`)
    }
}

//INSTALANDO OBJETOS 
const obra1 = new Obra(1,"La hora del almuerzo", "Pio Colivadino", 1903, "obra1.jpg")

const obra2 = new Obra(2,"La noche estrellada", "Van Gogh", 1889, "obra2.jpg")

const obra3 = new Obra(3,"La japonesa", "Monet", 1876, "obra3.jpg")

const obra4 = new Obra(4,"El Paseo","Monet", 1880, "obra4.jpg")

const obra5 = new Obra(5,"Sin pan y sin trabajo", "Ernesto de la Cárcova", 1894, "obra5.jpg")

const obra6 = new Obra(6,"Payada en una pulpería", "Carlos Morel", 1845, "obra6.jpg")

const obra7 = new Obra(7,"Dancing Skeletons", "Edward Burra", 1939, "obra7.jpg")

const obra8 = new Obra(8,"Autorretrato frente al caballete", "Sofonisba Anguissola", 1556, "obra8.jpg")

const obra9 = new Obra(9, "Mujer saliendo del psicoanalista", "Remedios Varo", 1960, "obra9.jpg")

 //ARRAY DE OBJETOS
let pinacoteca = []

if(localStorage.getItem("pinacoteca")){
    pinacoteca = JSON.parse(localStorage.getItem("pinacoteca"))
}else{
    console.log(`ENTRA POR PRIMERA VEZ. SETEAMOS ARRAY`)
    pinacoteca.push(obra1, obra2, obra3, obra4, obra5, obra6, obra7, obra8, obra9)
    localStorage.setItem("pinacoteca", JSON.stringify(pinacoteca))
}
