import './style.css'
// Variables globales
let ataqueJugador 
let ataqueEnemigo
let vidasJugador = 3
let vidasEnemigo = 3

const CLICK = 'click'
const HIPODOGE = 'Hipodoge'
const CAPIPEPO = 'Capipepo'
const RATIGUEYA = 'Ratigueya'
const FUEGO = 'FUEGO'
const AGUA = 'AGUA'
const TIERRA = 'TIERRA'

const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')
const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const sectionReiniciar = document.getElementById('reiniciar')
const botonMascotaJugador = document.getElementById('boton-mascota')
const botonFuego = document.getElementById('boton-fuego')
const botonAgua = document.getElementById('boton-agua')
const botonTierra = document.getElementById('boton-tierra')
const botonReiniciar = document.getElementById('boton-reiniciar')
const spanMascotaEnemigo = document.getElementById('mascota-enemigo')
const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')

function iniciarJuego() {
    sectionSeleccionarAtaque.style.display = 'none' // Ocultar section 
    sectionReiniciar.style.display = 'none'

    botonMascotaJugador.addEventListener(CLICK, seleccionarMascotaJugador)
    botonFuego.addEventListener(CLICK, ataqueFuego)
    botonAgua.addEventListener(CLICK, ataqueAgua)
    botonTierra.addEventListener(CLICK, ataqueTierra)
    botonReiniciar.addEventListener(CLICK, reiniciarJuego)

}

// Seleccionar mascota del jugador
function seleccionarMascotaJugador() {
    const inputHipodoge = document.getElementById('hipodoge')
    const inputCapipepo = document.getElementById('capipepo')
    const inputRatigueya = document.getElementById('ratigueya')
    const spanMascotaJugador = document.getElementById('mascota-jugador')

    if(inputHipodoge.checked) {
        sectionSeleccionarMascota.style.display = 'none' // Ocultar section seleccionar-ataque
        sectionSeleccionarAtaque.style.display = 'flex'
        spanMascotaJugador.innerHTML = HIPODOGE
        return seleccionarMascotaEnenmigo()
    } 
    if(inputCapipepo.checked) {
        sectionSeleccionarMascota.style.display = 'none' // Ocultar section seleccionar-ataque
        sectionSeleccionarAtaque.style.display = 'flex'
        spanMascotaJugador.innerHTML = CAPIPEPO
        return seleccionarMascotaEnenmigo()
    } 
    if(inputRatigueya.checked) {
        sectionSeleccionarMascota.style.display = 'none' // Ocultar section seleccionar-ataque
        sectionSeleccionarAtaque.style.display = 'flex'
        spanMascotaJugador.innerHTML = RATIGUEYA
        return seleccionarMascotaEnenmigo()
    } 

    alert('Por favor, seleccione una mascota')
    
}   

// Seleccionar mascota enemigo de manera aleatoria
function seleccionarMascotaEnenmigo() {
    const mascotaAleaotoria = aleatorio(1,3)

    switch (mascotaAleaotoria) {
        case 1:
            spanMascotaEnemigo.innerHTML = HIPODOGE
            break
        case 2:
            spanMascotaEnemigo.innerHTML = CAPIPEPO
            break
        default:
            spanMascotaEnemigo.innerHTML = RATIGUEYA
            break
    }
}

// Preparando Ataques 
// Cuando el jugador selccione su ataque automáticamente y de forma aleatoria se asignará un ataque al enemigo
function ataqueFuego() {
    ataqueJugador = FUEGO
    ataqueAleatorioEnemigo()
}
function ataqueAgua() {
    ataqueJugador = AGUA
    ataqueAleatorioEnemigo()
}
function ataqueTierra() {
    ataqueJugador = TIERRA
    ataqueAleatorioEnemigo()
}

// Ataques Enemigo
function ataqueAleatorioEnemigo() {
    const ataqueAleatorio = aleatorio(1,3)
    
    // switch (ataqueAleatorio) {
    //     case 1:
    //         ataqueEnemigo = FUEGO
    //         break
    //     case 2:
    //         ataqueEnemigo = AGUA
    //         break
    //     default:
    //         ataqueEnemigo = TIERRA
    //         break
    // }

    // diccionario 
    const ATAQUES = {
        1: FUEGO,
        2: AGUA,
        //3: TIERRA
    }

    ataqueEnemigo = ATAQUES[ataqueAleatorio] ?? TIERRA 

    combate()
}

function combate() {
    let resultado = "GANASTE"

    if (ataqueJugador === ataqueEnemigo) {
        resultado = 'EMPATE'
        crearMensaje(resultado) // Invocando función crearMensaje()
        return revisarVidas()
    }

    if (ataqueJugador === FUEGO && ataqueEnemigo === TIERRA) {
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
        crearMensaje(resultado)
        return revisarVidas()
    } 

    if (ataqueJugador === AGUA && ataqueEnemigo === FUEGO) {
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
        crearMensaje(resultado)
        return revisarVidas()
    }

    if (ataqueJugador === TIERRA && ataqueEnemigo === AGUA) {
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
        crearMensaje(resultado)
        return revisarVidas()
    } 

    resultado = 'PERDISTE'
    crearMensaje(resultado)
    vidasJugador--
    spanVidasJugador.innerHTML = vidasJugador
    

    // Revisar las vidas
    revisarVidas()
}

function revisarVidas() {
    if (vidasEnemigo === 0) {
        crearMensajeFinal('FELICITACIONES! Ganaste :)')
    }
    
    if (vidasJugador === 0) {
        crearMensajeFinal('Lo siento, perdiste :(')
    } 
}

function crearMensaje(resultado) {
    const sectionMensajes = document.getElementById('resultado')
    const ataquesDelJugador = document.getElementById('ataques-del-jugador')
    const ataquesDelEnemigo = document.getElementById('ataques-del-enemigo')

    const nuevoAtaqueDelJugador = document.createElement('p')
    const nuevoAtaqueDelEnemigo = document.createElement('p')

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = ataqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = ataqueEnemigo

    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}

function crearMensajeFinal(resultadoFinal) {
    const sectionMensajes = document.getElementById('resultado')
    sectionMensajes.innerHTML = resultadoFinal


    const botonFuego = document.getElementById('boton-fuego')
    botonFuego.disabled = true
    const botonAgua = document.getElementById('boton-agua')
    botonAgua.disabled = true
    const botonTierra = document.getElementById('boton-tierra')
    botonTierra.disabled = true

    const sectionReiniciar = document.getElementById('reiniciar')
    sectionReiniciar.style.display = 'block'

}

function reiniciarJuego() {
    location.reload()
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

window.addEventListener('load', iniciarJuego)