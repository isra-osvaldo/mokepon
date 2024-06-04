// Variables globales
let ataqueJugador 
let ataqueEnemigo
let vidasJugador = 3
let vidasEnemigo = 3


function iniciarJuego() {
    let sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
    sectionSeleccionarAtaque.style.display = 'none' // Ocultar section 

    let sectionReiniciar = document.getElementById('reiniciar')
    sectionReiniciar.style.display = 'none'


    let botonMascotaJugador = document.getElementById('boton-mascota')
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)

    let botonFuego = document.getElementById('boton-fuego')
    botonFuego.addEventListener('click', ataqueFuego)
    let botonAgua = document.getElementById('boton-agua')
    botonAgua.addEventListener('click', ataqueAgua)
    let botonTierra = document.getElementById('boton-tierra')
    botonTierra.addEventListener('click', ataqueTierra)

    let botonReiniciar = document.getElementById('boton-reiniciar')
    botonReiniciar.addEventListener('click', reiniciarJuego)

}

// Seleccionar mascota del jugador
function seleccionarMascotaJugador() {
    const  sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')
    sectionSeleccionarMascota.style.display = 'none' // Ocultar section 

    const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
    sectionSeleccionarAtaque.style.display = 'flex'

    const inputHipodoge = document.getElementById('hipodoge')
    const inputCapipepo = document.getElementById('capipepo')
    const inputRatigueya = document.getElementById('ratigueya')
    const spanMascotaJugador = document.getElementById('mascota-jugador')

    if(inputHipodoge.checked) {
        spanMascotaJugador.innerHTML = 'Hipodoge'
    } else if(inputCapipepo.checked) {
        spanMascotaJugador.innerHTML = 'Capipepo'
    } else if(inputRatigueya.checked) {
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
    const spanMascotaEnemigo = document.getElementById('mascota-enemigo')

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
    const spanVidasJugador = document.getElementById('vidas-jugador')
    const spanVidasEnemigo = document.getElementById('vidas-enemigo')

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