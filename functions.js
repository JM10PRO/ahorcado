let parrafoVidas = "";
let botonJugar = "";
let parrafoGuiones = "";
let parrafoOculto = "";
let palabraOcultada = [];
let letrasRestantes = "";
let palabraSeleccionada = "";
let numeroVidas = 6;
let letrasUsadas = [];
let categorias = "";
let espacioBotonera = "";
const music = new Audio("sound/west.mp3");
const fallo = new Audio("sound/fallo.mp3");
const hasPerdido = new Audio("sound/goofy.mp3");
const winnner = new Audio("sound/winner.mp3");

// Inicializa estas variables cuando cargue el contenido para interactuar con la página
function lanzadera() {
    parrafoVidas = document.getElementById('vidas');
    botonJugar = document.getElementById('jugar');
    parrafoGuiones = document.getElementById('guiones');
    parrafoOculto = document.getElementById('parrafoOculto');
    espacioBotonera = document.getElementById('botonera');
}

// Muestra el contenido a pantalla completa o a modo ventana según su estado actual
function toggleFullScreen() {
    let textoBoton = document.getElementById('bt-pantalla-completa');
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
        textoBoton.textContent = "Salir pantalla completa";
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
            textoBoton.textContent = "Pantalla completa";
        }
    }
}

function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

function categoria() {
    categorias = document.getElementById('opciones');

    let categoriaSeleccionada = categorias.options[categorias.selectedIndex].textContent;
    
    if (categoriaSeleccionada != "seleccionar categoria") {
        let arrayPalabrasCategoria = document.getElementById(categoriaSeleccionada).textContent.split(" ");

        let indice = getRandomNumber(0, arrayPalabrasCategoria.length - 1).toFixed(0);

        palabraSeleccionada = arrayPalabrasCategoria[indice];
    } else {
        categorias.options[0].textContent = 'categoria random';

        let indiceAleatorio = getRandomNumber(1, categorias.options.length - 1).toFixed(0);

        let categoriaAleatoria = categorias.options[indiceAleatorio].textContent;

        let arrayPalabrasCategoriaAleatoria = document.getElementById(categoriaAleatoria).textContent.split(" ");

        let palabraAleatoria = getRandomNumber(0, arrayPalabrasCategoriaAleatoria.length - 1).toFixed(0);

        palabraSeleccionada = arrayPalabrasCategoriaAleatoria[palabraAleatoria];
    }
    return palabraSeleccionada;
}
function getNuevaPalabra() {
    botonJugar.style.display = 'none';
    parrafoGuiones.style.display = '';
    parrafoVidas.style.display = '';
    palabraOcultada = [];
    espacioBotonera.style.display = '';
    parrafoVidas.style.color = 'red';
    parrafoVidas.textContent = numeroVidas + ' vidas restantes';
    // let indice = getRandomWord(0, cultura.length - 1).toFixed(0);
    palabraSeleccionada = categoria();
    letrasRestantes = palabraSeleccionada.length;
    getGuiones(palabraSeleccionada);
    let contenido = getPalabraOculta();
    parrafoGuiones.textContent = contenido;
    muestraFondoHangMan(numeroVidas);
    mostrarBotonera();
}

function getPalabraOculta() {
    let palabraConGuiones = "";
    for (let i = 0; i < palabraOcultada.length; i++) {
        palabraConGuiones += palabraOcultada[i];
    }
    return palabraConGuiones;
}

function getGuiones(palabra) {
    let letras = palabra.split("");

    for (let i = 0; i < letras.length; i++) {
        palabraOcultada[i] = " _ ";
    }
}

function mostrarBotonera() {
    let abecedario = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    for (let i = 0; i < abecedario.length; i++) {
        let span = document.createElement('span');
        let botonLetra = document.createElement('button');
        botonLetra.innerText = abecedario[i];
        botonLetra.setAttribute('onclick', 'comprobarSiHayEsaLetra(this)');
        botonLetra.classList.add('botonLetra');
        span.appendChild(botonLetra);
        espacioBotonera.appendChild(span);
    }
}

function borrarBotonesBotonera() {
    let botonera = document.getElementById('botonera');
    while (botonera.hasChildNodes()) {
        botonera.removeChild(botonera.firstChild);
    }
}
function comprobarSiHayEsaLetra(botonLetra) {
    letra = botonLetra.innerText.toLowerCase();
    botonLetra.disable = true;
    botonLetra.style.opacity = 0.7;
    botonLetra.style.backgroundColor = 'gray';
    botonLetra.setAttribute('onclick', '');
    let letraEncontrada = false;

    for (let i = 0; i < palabraOcultada.length; i++) {
        if (letra == palabraSeleccionada[i]) {
            palabraOcultada[i] = letra;
            let contenido = getPalabraOculta();
            parrafoGuiones.textContent = contenido;
            letraEncontrada = true;
            letrasRestantes--;
        }
    }

    document.getElementById('letra').value = "";

    if (letraEncontrada) {
        if (letrasRestantes == 0) {
            sonidoWinner();
            parrafoVidas.style.color = 'green';
            parrafoVidas.textContent = '¡HAS GANADO!';
            parrafoOculto.style.display = 'none';
            borrarBotonesBotonera();
            categorias.options[0].textContent = 'seleccionar categoria';
            botonJugar.innerText = 'JUGAR DE NUEVO';
            botonJugar.style.display = '';
            numeroVidas = 6;
        }
    } else {
        sonidoFallo();
        numeroVidas--;
        numeroVidas = actualizaEstadoVidas();
    }
}

function actualizaEstadoVidas() {
    if (numeroVidas == 0) {
        muestraFondoHangMan(numeroVidas);
        sonidoHasPerdido();
        parrafoOculto.style.display = 'none';
        parrafoVidas.textContent = 'La partida ha terminado';
        parrafoGuiones.textContent = 'La palabra secreta era "' + palabraSeleccionada + '"';
        borrarBotonesBotonera();
        espacioBotonera.style.display = 'none';
        categorias.options[0].textContent = 'seleccionar categoria';
        palabraOcultada = [];
        letrasRestantes = 0;
        numeroVidas = 6;
        botonJugar.innerText = 'JUGAR DE NUEVO';
        botonJugar.style.display = '';
    } else {
        muestraFondoHangMan(numeroVidas);
        parrafoVidas.textContent = numeroVidas + ' vidas restantes';
    }
    return numeroVidas;
}

function muestraFondoHangMan(numeroVidas) {
    let nuevoFondo = " #ff0000ae url('img/western" + numeroVidas + ".png') no-repeat center center fixed";

    if (numeroVidas == 6) {
        document.body.style.background = nuevoFondo;
    } else if (numeroVidas == 5) {
        document.body.style.background = nuevoFondo;
    } else if (numeroVidas == 4) {
        document.body.style.background = nuevoFondo;
    } else if (numeroVidas == 3) {
        document.body.style.background = nuevoFondo;
    } else if (numeroVidas == 2) {
        document.body.style.background = nuevoFondo;
    } else if (numeroVidas == 1) {
        document.body.style.background = nuevoFondo;
    } else if (numeroVidas == 0) {
        document.body.style.background = nuevoFondo;
    }
}

function reproducirMusica() {
    if (music.paused) {
        music.loop = true;
        music.play();
    } else {
        music.pause();
    }
}

function sonidoFallo() {
    fallo.play();
}

function sonidoHasPerdido() {
    hasPerdido.play();
}

function sonidoWinner() {
    winnner.play();
}