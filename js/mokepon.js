// Variables globales
let ataqueJugador 
let ataqueEnemigo


function iniciarJuego() {
    let botonMascotaJugador = document.getElementById('boton-mascota')
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)

    let botonFuego = document.getElementById('boton-fuego')
    botonFuego.addEventListener('click', ataqueFuego)

    let botonAgua = document.getElementById('boton-agua')
    botonAgua.addEventListener('click', ataqueAgua)
    
    let botonTierra = document.getElementById('boton-tierra')
    botonTierra.addEventListener('click', ataqueTierra)

}

// Seleccionar mascota del jugador
function seleccionarMascotaJugador() {
    let inputHipodoge = document.getElementById('hipodoge')
    let inputCapipepo = document.getElementById('capipepo')
    let inputRatigueya = document.getElementById('ratigueya')
    let spanMascotaJugador = document.getElementById('mascota-jugador')

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
    let mascotaAleaotoria = aleatorio(1,3)
    let spanMascotaEnemigo = document.getElementById('mascota-enemigo')

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
    let ataqueAleatorio = aleatorio(1,3)
    
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
    } else if (ataqueJugador == 'AGUA' && ataqueEnemigo == 'FUEGO') {
        crearMensaje('GANASTE')
    } else if (ataqueJugador == 'TIERRA' && ataqueEnemigo == 'AGUA') {
        crearMensaje('GANASTE')
    } else {
        crearMensaje('PERDISTE')
    }
}

function crearMensaje(resultado) {
    let sectionMensajes = document.getElementById('mensajes')
    let parrafo = document.createElement('p')
    parrafo.innerHTML = `Tu mascota atacó con ${ataqueJugador}, la mascota del enemigo atacó con ${ataqueEnemigo} - ${resultado}`

    sectionMensajes.appendChild(parrafo)
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}


window.addEventListener('load', iniciarJuego)