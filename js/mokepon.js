const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const sectionReiniciar = document.getElementById('reiniciar')
const botonMascotaJugador = document.getElementById('boton-mascota')
const botonFuego = document.getElementById('boton-fuego')
const botonAgua = document.getElementById('boton-agua')
const botonTierra = document.getElementById('boton-tierra')
const botonReiniciar = document.getElementById('boton-reiniciar')

const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')
const inputHipodoge = document.getElementById('hipodoge')
const inputCapipepo = document.getElementById('capipepo')
const inputRatigueya = document.getElementById('ratigueya')
const spanMascotaJugador = document.getElementById('mascota-jugador')

const spanMascotaEnemigo = document.getElementById('mascota-enemigo')

const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')

const sectionMensajes = document.getElementById('resultado')
const ataquesDelJugador = document.getElementById('ataques-del-jugador')
const ataquesDelEnemigo = document.getElementById('ataques-del-enemigo')

// Variables globales
let ataqueJugador 
let ataqueEnemigo
let vidasJugador = 3
let vidasEnemigo = 3

class Mokepon {
    constructor(nombre, foto, vida) {
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
    }
}

let hipodoge = new Mokepon('Hipodoge', './assets/hipodoge.png', 5)
let capipepo = new Mokepon('Capipepo', './assets/capipepo.png', 5)
let ratigueya = new Mokepon('Ratigueya', './assets/ratigueya.png', 5)

function iniciarJuego() {
    sectionSeleccionarAtaque.style.display = 'none' // Ocultar section 
    sectionReiniciar.style.display = 'none'
    
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)
    botonFuego.addEventListener('click', ataqueFuego)
    botonAgua.addEventListener('click', ataqueAgua)
    botonTierra.addEventListener('click', ataqueTierra)
    
    botonReiniciar.addEventListener('click', reiniciarJuego)

}

// Seleccionar mascota del jugador
function seleccionarMascotaJugador() {

    if(inputHipodoge.checked) {
        sectionSeleccionarMascota.style.display = 'none' // Ocultar section 
        sectionSeleccionarAtaque.style.display = 'flex'
        spanMascotaJugador.innerHTML = 'Hipodoge'
    } else if(inputCapipepo.checked) {
        sectionSeleccionarMascota.style.display = 'none' // Ocultar section 
        sectionSeleccionarAtaque.style.display = 'flex'
        spanMascotaJugador.innerHTML = 'Capipepo'
    } else if(inputRatigueya.checked) {
        sectionSeleccionarMascota.style.display = 'none' // Ocultar section 
        sectionSeleccionarAtaque.style.display = 'flex'
        spanMascotaJugador.innerHTML = 'Ratigueya'
    } else {
        alert('Selecciona una mascota')
    }
    // Luego que el jugador elige una mascota, el enemigo automáticamente elegirá su mascota de forma aleatoria 
    seleccionarMascotaEnenmigo() // Invocando la función 
}   

// Seleccionar mascota enemigo de manera aleatoria
function seleccionarMascotaEnenmigo() {
    const mascotaAleaotoria = aleatorio(1,3)

    if (mascotaAleaotoria == 1) {
        spanMascotaEnemigo.innerHTML = 'Hipodoge'
    } else if (mascotaAleaotoria == 2) {
        spanMascotaEnemigo.innerHTML = 'Capipepo'
    } else {
        spanMascotaEnemigo.innerHTML = 'Ratigueya'
    }
}

// Preparando Ataques 
// Cuando el jugador selccione su ataque automáticamente y de forma aleatoria se asignará un ataque al enemigo
function ataqueFuego() {
    ataqueJugador = 'FUEGO'
    ataqueAleatorioEnemigo()
}
function ataqueAgua() {
    ataqueJugador = 'AGUA'
    ataqueAleatorioEnemigo()
}
function ataqueTierra() {
    ataqueJugador = 'TIERRA'
    ataqueAleatorioEnemigo()
}

// Ataques Enemigo
function ataqueAleatorioEnemigo() {
    const ataqueAleatorio = aleatorio(1,3)
    
    if (ataqueAleatorio == 1) {
        ataqueEnemigo = 'FUEGO'
    } else if (ataqueAleatorio == 2) {
        ataqueEnemigo = 'AGUA'
    } else {
        ataqueEnemigo = 'TIERRA'
    }

    combate()
}

function combate() {
    
    if (ataqueJugador == ataqueEnemigo) {
        crearMensaje('EMPATE') // Invocando función crearMensaje()
    } else if (ataqueJugador == 'FUEGO' && ataqueEnemigo == 'TIERRA') {
        crearMensaje('GANASTE')
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
    } else if (ataqueJugador == 'AGUA' && ataqueEnemigo == 'FUEGO') {
        crearMensaje('GANASTE')
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
    } else if (ataqueJugador == 'TIERRA' && ataqueEnemigo == 'AGUA') {
        crearMensaje('GANASTE')
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
    } else {
        crearMensaje('PERDISTE')
        vidasJugador--
        spanVidasJugador.innerHTML = vidasJugador
    }

    // Revisar las vidas
    revisarVidas()
}

function revisarVidas() {
    if (vidasEnemigo == 0) {
        crearMensajeFinal('FELICITACIONES! Ganaste :)')
    } else if (vidasJugador == 0) {
        crearMensajeFinal('Lo siento, perdiste :(')
    } 
}

function crearMensaje(resultado) {

    const nuevoAtaqueDelJugador = document.createElement('p')
    const nuevoAtaqueDelEnemigo = document.createElement('p')

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = ataqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = ataqueEnemigo

    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}

function crearMensajeFinal(resultadoFinal) {
    
    sectionMensajes.innerHTML = resultadoFinal
    
    botonFuego.disabled = true
    botonAgua.disabled = true
    botonTierra.disabled = true

    
    sectionReiniciar.style.display = 'block'

}

function reiniciarJuego() {
    location.reload()
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

window.addEventListener('load', iniciarJuego)