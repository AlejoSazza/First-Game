const botonMascotaJugador = document.getElementById ("boton-mascota")
const botonreiniciar = document.getElementById ("boton-reiniciar")
const sectionataque = document.getElementById("seleccionar-ataque")
const sectionreiniciar =document.getElementById("reinicia")
const sectionmascota = document.getElementById("seleccionar-mascota")
const spanMascotaJugador= document.getElementById("mascota-jugador")
const spanVidasJugador= document.getElementById("vidas-jugador")
const spanVidasEnemigo= document.getElementById("vidas-enemigo")
const spanMascotaEnemigo = document.getElementById("mascota-enemigo")
const sectionMensajes = document.getElementById("resultado")
const ataquesDelJugador = document.getElementById("ataque-del-jugador")
const ataquesDelEnemigo = document.getElementById("ataque-del-enemigo")
const contenedorTarjetas=document.getElementById("contenedorTarjetas")
const contenedorAtaques=document.getElementById("contenedorAtaques")
const sectionVermapa = document.getElementById("ver-mapa")
const mapa = document.getElementById("mapa")



let mokepones=[]
let ataqueJugador = []
let ataqueEnemigo = []
let opcionDeMokepones 
let inputHipodoge
let inputCapipego 
let inputRatigueya
let mascotajugador
let mascotaJugadorObjeto
let ataquesMokepon
let ataquesMokeponEnemigo
let botonFuego
let botonAgua
let botonTierra
let botones=[]
let indexAtaqueJugador
let indexAtaqueEnemigo
let victoriasJugador=0
let victoriasEnemigo=0
let vidasJugador= 3 
let vidasEnemigo=3
//CANVAS//
let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackground = new Image()
mapaBackground.src = './mokemap.png'

let alturaQueBuscamos
let anchoDelMapa = window.innerWidth - 20
const anchoMaximoDelMapa = 350

if (anchoDelMapa > anchoMaximoDelMapa) {
    anchoDelMapa = anchoMaximoDelMapa - 20
}

alturaQueBuscamos = anchoDelMapa * 600 / 800

mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos

class Mokepon {
    constructor(nombre, foto, vida, fotoMapa,) {
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques=[]
        this.ancho = 40
        this.alto = 40
        this.x = aleatorio(0, mapa.width - this.ancho)
        this.y = aleatorio(0, mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }
    pintarMokepon (){


        lienzo.drawImage(
        this.mapaFoto,
        this.x,
        this.y,
        this.ancho,
        this.alto
        )
    }
}

let hipodoge = new Mokepon('Hipodoge', './assest/1-removebg-preview.png', 5, './assest/1-removebg-preview.png' )

let capipego = new Mokepon('Capipego', './assest/2-removebg-preview.png', 5, './assest/2-removebg-preview.png')

let ratigueya = new Mokepon('Ratigueya', './assest/3-removebg-preview.png', 5, './assest/3-removebg-preview.png')

let hipodogeEnemigo = new Mokepon('Hipodoge', './assest/1-removebg-preview.png', 5, './assest/1-removebg-preview.png',  )

let capipegoEnemigo = new Mokepon('Capipego', './assest/2-removebg-preview.png', 5, './assest/2-removebg-preview.png', )

let ratigueyaEnemigo = new Mokepon('Ratigueya', './assest/3-removebg-preview.png', 5, './assest/3-removebg-preview.png',)

hipodoge.ataques.push(
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🌱', id: 'boton-tierra' },
)

hipodogeEnemigo.ataques.push(
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🌱', id: 'boton-tierra' },
)

capipego.ataques.push(
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego' },
    
)

capipegoEnemigo.ataques.push(
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🌱', id: 'boton-tierra' },
)

ratigueya.ataques.push(
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🌱', id: 'boton-tierra' },
)

ratigueyaEnemigo.ataques.push(
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🌱', id: 'boton-tierra' },
)
mokepones.push(hipodoge,capipego,ratigueya)

function iniciarJuego(){
    sectionataque.style.display="none"
    sectionVermapa.style.display="none"
    mokepones.forEach((mokepon) =>{
opcionDeMokepones=  `    
<input type ="radio" name="mascota" id=${mokepon.nombre} /> 
<label class="tarjeta-de-mokepon" for =${mokepon.nombre}>
    <p>${mokepon.nombre}</p>
    <img src=${mokepon.foto} alt=${mokepon.nombre}>
</label> 
`
contenedorTarjetas.innerHTML += opcionDeMokepones

inputHipodoge = document.getElementById("Hipodoge")
inputCapipego = document.getElementById("Capipego")
inputRatigueya= document.getElementById("Ratigueya")

    })
    
    botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador)

   
    
    botonreiniciar.addEventListener("click", reiniciarjuego)
    
    sectionreiniciar.style.display="none"
}
function seleccionarMascotaJugador(){
    
    sectionmascota.style.display="none"
    
    
    
    if (inputHipodoge.checked){
        spanMascotaJugador.innerHTML = inputHipodoge.id
        mascotajugador=inputHipodoge.id
    } else if (inputCapipego.checked){
        spanMascotaJugador.innerHTML = inputCapipego.id
        mascotajugador=inputCapipego.id
    } else if (inputRatigueya.checked){
        spanMascotaJugador.innerHTML = inputRatigueya.id
        mascotajugador=inputRatigueya.id
    } else {
        alert("Selecciona alguna de las mascotas")
    }

    extraerAtaques ( mascotajugador )
    sectionVermapa.style.display="flex"
    iniciarMapa()
    
}

function extraerAtaques(mascotajugador) {
    let ataques
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotajugador === mokepones[i].nombre) {
            ataques = mokepones[i].ataques
        }
        
    }
    mostrarAtaques(ataques)
}

function mostrarAtaques (ataques){
    ataques.forEach((ataque) => {
        ataquesMokepon = `
            <button id=${ataque.id} class="boton-de-ataque BAtaque">
                ${ataque.nombre}
            </button>
        `
        
        contenedorAtaques.innerHTML += ataquesMokepon
    })
    
    botonFuego=document.getElementById("boton-fuego")
    botonAgua=document.getElementById("boton-agua")
    botonTierra=document.getElementById("boton-tierra")
    botones=document.querySelectorAll(".BAtaque")



}

function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            if (e.target.innerText === '🔥') {
                ataqueJugador.push('FUEGO')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.disabled=true
            
            } else if (e.target.innerText === '💧') {
                ataqueJugador.push('AGUA')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.disabled=true
            } else {
                ataqueJugador.push('TIERRA')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.disabled=true
            }
            ataqueAleatorioEnemigo()
        })

    })
    
}

function seleccionarMascotaEnemigo(enemigo) {
    spanMascotaEnemigo.innerHTML = enemigo.nombre
    ataquesMokeponEnemigo = enemigo.ataques
    secuenciaAtaque()
}



function ataqueAleatorioEnemigo(){
    let ataqueAleatorio = aleatorio(0,ataquesMokeponEnemigo.length - 1)
    if (ataqueAleatorio == 0 || ataqueAleatorio == 1){
        ataqueEnemigo.push ("FUEGO")
        } else if (ataqueAleatorio == 3 || ataqueAleatorio == 4){
            ataqueEnemigo.push ("AGUA")
    } else {
        ataqueEnemigo.push ("TIERRA")
    }
    console.log(ataqueEnemigo)
    iniciarPelea()
    } 
function iniciarPelea(){
    if (ataqueJugador.length === 5) {
        combate()
    }

}

function indexAmbosOponentes(jugador, enemigo){
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}
function combate () {
    for (let index = 0; index < ataqueJugador.length; index++) {
        if(ataqueJugador[index]=== ataqueEnemigo[index]) {
            indexAmbosOponentes(index, index)
            crearMensaje("EMPATE")
           
        } else if (ataqueJugador[index]=== "FUEGO" && ataqueEnemigo[index] === "TIERRA"){
            indexAmbosOponentes(index, index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML= victoriasJugador
        }  else if (ataqueJugador[index]=== "AGUA" && ataqueEnemigo[index] === "FUEGO"){
            indexAmbosOponentes(index, index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML= victoriasJugador

        }  else if(ataqueJugador[index]=== "TIERRA" && ataqueEnemigo[index] === "AGUA"){
            indexAmbosOponentes(index, index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML= victoriasJugador
        }else {
            indexAmbosOponentes(index, index)
            crearMensaje("PERDISTE")
            victoriasEnemigo++
            spanVidasEnemigo.innerHTML= victoriasEnemigo
        }
    }

    revisarVidas()        
}

function revisarVidas(){

        if (victoriasJugador===victoriasEnemigo) {
        crearMensajeFinal("Esto fue un empate!!!")
    } else if(victoriasJugador> victoriasEnemigo){
    crearMensajeFinal("Victoria!")
    } else {
        crearMensajeFinal("Derrota!")
    }

}

function crearMensaje(resultado){
   
    
    let  nuevoAtaqueDelJugador=document.createElement("p")
    let  nuevoAtaqueDelEnemigo=document.createElement("p")

    sectionMensajes.innerHTML=resultado
    nuevoAtaqueDelJugador.innerHTML= indexAtaqueJugador
    nuevoAtaqueDelEnemigo.innerHTML= indexAtaqueEnemigo

    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}

function crearMensajeFinal(resultadoFinal) {
    
    
    sectionMensajes.innerHTML = resultadoFinal
    
    
    botonMascotaJugador.disabled=true
    
    
    
    sectionreiniciar.style.display="block"
}

function reiniciarjuego() {
    location.reload()
}
function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + 
    min)
} 

function pintarCanvas() {           
    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
  
  mascotaJugadorObjeto.pintarMokepon()
  hipodogeEnemigo.pintarMokepon()
  capipegoEnemigo.pintarMokepon()
  ratigueyaEnemigo.pintarMokepon()

  if (mascotaJugadorObjeto.velocidadX !== 0 || mascotaJugadorObjeto.velocidadY !== 0) {
    revisarColision(hipodogeEnemigo)
    revisarColision(capipegoEnemigo)
    revisarColision(ratigueyaEnemigo)
}


}

function moverUp(){
    mascotaJugadorObjeto.velocidadY = -5

   
}
function moverLeft(){
    mascotaJugadorObjeto.velocidadX = -5
   
}
function moverDown(){
    mascotaJugadorObjeto.velocidadY = +5
   
}
function moverRight(){
    mascotaJugadorObjeto.velocidadX = +5
   
}

function detenerMovimiento() {
    mascotaJugadorObjeto.velocidadX = 0
    mascotaJugadorObjeto.velocidadY = 0
}

function sePresionoUnaTecla(event) {    
    switch (event.key) {
        case 'ArrowUp':
            moverUp()
            break
        case 'ArrowDown':
            moverDown()
            break
        case 'ArrowLeft':
            moverLeft()
            break
        case 'ArrowRight':
            moverRight()
            break
        default:
            break
    }

   
}

function iniciarMapa () {

   
    mascotaJugadorObjeto = obtenerObjetoMascota(mascotajugador)
    
    intervalo = setInterval(pintarCanvas, 50)
    
    window.addEventListener('keydown', sePresionoUnaTecla)

    window.addEventListener('keyup', detenerMovimiento)
        
}

function obtenerObjetoMascota() {
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotajugador === mokepones[i].nombre) {
            return mokepones[i]
        }
        
    }
}

function revisarColision(enemigo) {
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x

    const arribaMascota = 
        mascotaJugadorObjeto.y
    const abajoMascota = 
        mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
    const derechaMascota = 
        mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
    const izquierdaMascota = 
        mascotaJugadorObjeto.x

    if(
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo
    ) {
        return
    }

    detenerMovimiento()
    clearInterval(intervalo)
    sectionataque.style.display="flex"
    sectionVermapa.style.display="none"
    seleccionarMascotaEnemigo(enemigo)
    alert("Hay colision " +  enemigo.nombre)
}
window.addEventListener("load", iniciarJuego)