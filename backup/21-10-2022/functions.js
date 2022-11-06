let cultura = ['monumento', 'cuadro', 'vino'];
let parrafoVidas = "";
let parrafoInicio = "";
let parrafoGuiones = "";
let parrafoOculto = "";
let palabraOcultada = [];
let letrasRestantes = 0;
let palabraSeleccionada = "";
let numeroVidas = 6;
let letrasUsadas = [];

function lanzadera() {
    alert('Page is loaded');
    parrafoVidas = document.getElementById('vidas');
    parrafoInicio = document.getElementById('parrafo');
    parrafoGuiones = document.getElementById('guiones');
    parrafoOculto = document.getElementById('parrafoOculto');
}

function getNuevaPalabra() {
    parrafoInicio.style.display = 'none';
    parrafoGuiones.style.display = '';
    parrafoVidas.style.display = '';
    parrafoVidas.textContent = numeroVidas + ' vidas restantes';
    let indice = getRandomWord(0, cultura.length - 1).toFixed(0);
    palabraSeleccionada = cultura[indice];
    letrasRestantes = palabraSeleccionada.length;
    getGuiones(palabraSeleccionada);
    let contenido = getPalabraOculta();
    parrafoGuiones.textContent = contenido;
    parrafoOculto.style.display = '';
}

function getPalabraOculta() {
    let palabraConGuiones = "";
    for (let i = 0; i < palabraOcultada.length; i++) {
        palabraConGuiones += palabraOcultada[i];
    }
    return palabraConGuiones;
}

function getRandomWord(min, max) {
    return Math.random() * (max - min) + min;
}

function getGuiones(palabra) {
    let letras = palabra.split("");
    console.log(letras);
    for (let i = 0; i < letras.length; i++) {
        palabraOcultada[i] = " _ ";
    }
    console.log(palabraOcultada);
    console.log(palabraOcultada.length);
}

function comprobarSiHayEsaLetra(letra) {
    letra = document.getElementById('letra').value;
    let letraEncontrada = false;

    //if(!checkLetraUsada(letra)){
    for (let i = 0; i < palabraOcultada.length; i++) {
        if (letra == palabraSeleccionada[i]) {
            palabraOcultada[i] = letra;
            let contenido = getPalabraOculta();
            parrafoGuiones.textContent = contenido;
            console.log(palabraOcultada);
            letraEncontrada = true;
            letrasRestantes--;
        }
    }
    //}
    document.getElementById('letra').value = "";
    if (letraEncontrada) {
        console.log('está la letra');
        console.log('letras restantes = ' + letrasRestantes);
        console.log(palabraSeleccionada.length);
        if (letrasRestantes == 0) {
            parrafoVidas.style.color = 'green';
            parrafoVidas.textContent = '¡HAS GANADO!';
            parrafoOculto.style.display = 'none';
        }
    } else {
        console.log('NO está la letra');
        numeroVidas--;
        numeroVidas = getVidas();
    }
}

function getVidas() {
    if (numeroVidas == 0) {
        parrafoOculto.style.display = 'none';
        parrafoVidas.textContent = 'Se acabó la partida';
        parrafoGuiones.textContent = 'La palabra secreta era "' + palabraSeleccionada + '"';
    } else {
        parrafoVidas.textContent = numeroVidas + ' vidas restantes';
    }
    return numeroVidas;
}