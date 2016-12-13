window.onload = inicio;
var nodoAnterior, numParDos, numParUno, intentos = 0, aciertos = 0, tiempo = 0;
setInterval(function(){
    tiempo++;
}, 1000);
function inicio(){
    var lista = document.getElementsByName('lista');
    var inputs = document.getElementsByTagName('input');

    if(localStorage.getItem('uno') == undefined){
      inicializaRanking();
    }
    lista[0].removeAttribute('id');
    lista[0].addEventListener('click', function(){
       tiempo = 0;
       lista[0].setAttribute('id', 'invisible');
       generaCartasNegras(lista[0].value);
       var numerosAleatorios = generaAleatorios(lista[0].value);
       generaEventos(numerosAleatorios);
    });
    inputs[0].addEventListener('click', function(){
      listarRanking();
    });

}

function generaCartasNegras(numero){
    var cajon = document.getElementById('cajonDeSastre');
    var ruta = "images/inicial.jpg";
    var imagen;
    cajon.innerHTML = "";
    for(var i = 0, fin = numero; i<fin;i++){
        imagen = document.createElement('img');
        imagen.setAttribute('src', ruta);
        imagen.setAttribute('name', i);
        cajon.appendChild(imagen);
    }
}

function generaAleatorios(numero){
    var arrRandom = new Array();
    var arrInicialA = new Array();
    var arrInicialB = new Array();
    var arrOrdenado = new Array();
    var numeroAle;


    for(i = 0; i<numero/2;i++){
      arrInicialA[i] = Math.round(Math.random() * 39);
      arrInicialB[i] = arrInicialA[i];
    }
    arrOrdenado = arrInicialA.concat(arrInicialB);

    arrRandom = arrOrdenado.sort(function() {return Math.random() - 0.5});
    return arrRandom;

}


function generaEventos(arrAleatorios){
    var imagenes = document.getElementById('cajonDeSastre').getElementsByTagName('img');


    for(var i = 0, fin = imagenes.length; i<fin;i++){
         imagenes[i].addEventListener('click', function(){
            this.setAttribute('src', 'images/'+ arrAleatorios[this.name]+ '.jpg');

            comprobador(arrAleatorios[this.name],this);
        })
    }

}

/*Recibe el valor de la carta y el nodo de la carta, "devuelve" el nodo pulsado */
function comprobador(valor, nodo){
    if(nodo !== nodoAnterior){
    if(numParUno!==null){
        numParDos = valor;
    }else{
        numParUno = valor;
    }
    var imagenes = document.getElementsByTagName('img');
    if(numParUno != numParDos && numParUno !== null && numParDos !== null){

      if(nodoAnterior!=undefined){
            nodoAnterior.setAttribute('src', 'images/inicial.jpg');
            }

        numParUno = numParDos; numParDos = null;
        intentos++;

    }
    if(numParUno===numParDos && (nodo.alt != 'acertado' && nodo.alt != 'acertado')){
        numParUno = null; numParDos = null;
        aciertos++;
        nodo.addEventListener('click',function () {
          alert('no insistas')
        });
        nodo.setAttribute('alt', 'acertado');
        nodoAnterior.addEventListener('click',function () {
          alert('no insistas');
        });
        nodoAnterior.setAttribute('alt', 'acertado');

    }
    nodoAnterior = nodo;


    intentosYAciertos();

  }
}

function intentosYAciertos(){
    var sw = false;
    var fotos = document.getElementsByName('lista');
    var numeroFotos = fotos[0].value;
    var cajon = document.getElementById('cajonDeSastre');

    if(aciertos===(numeroFotos/2)){
        alert('Ganaste, en '+ intentos + ' intentos y en nada menos que '+tiempo+' segundos');
        var txtGanador = document.createElement('input');
        txtGanador.setAttribute('id', 'txtGanador');
        var btnGanador = document.createElement('input');
        btnGanador.setAttribute('id', 'btnGanador');
        btnGanador.setAttribute('type', 'button');
        btnGanador.setAttribute('value', 'Enviar');
        cajon.appendChild(txtGanador);
        cajon.appendChild(btnGanador);
        document.getElementById('btnGanador').addEventListener('click', function() {
          var txtIntro = document.getElementById('txtGanador');
          console.log(txtIntro.value);
          comprobarRanking(txtIntro.value);
          reseteaJuego();
          });
        }
}

function reseteaJuego(){
    intentos = 0;
    aciertos = 0;


    inicio();
}
/* Cuando se encuentra que el localStorage está vacío, esta function inicializa 5 valores vacíos*/
function inicializaRanking() {
    var contenidoRanking = Object();
    var posiciones = Array("uno", "dos", "tres", "cuatro", "cinco");
    contenidoRanking.nombre = "";
    contenidoRanking.intentos = 0;
    contenidoRanking.tiempo = 0;

    for(var i = 0, fin = posiciones.length; i < fin; i++){
      localStorage.setItem(posiciones[i], JSON.stringify(contenidoRanking));
    }


}
function comprobarRanking(nombre) {
    var contenidoPosicion = Object();
    var posiciones = Array("uno", "dos", "tres", "cuatro", "cinco");
    var i = 0;
      do{

        var fin = posiciones.length

      contenidoPosicion = localStorage.getItem(posiciones[i]);
      contenidoPosicion = JSON.parse(contenidoPosicion);

      if(contenidoPosicion.intentos < intentos){
        console.log(contenidoPosicion.intentos);
        contenidoPosicion.nombre = nombre;
        contenidoPosicion.intentos = intentos;
        contenidoPosicion.tiempo = tiempo;
        console.log(contenidoPosicion.nombre);
        break;
      }
      i++;
    }while(i<fin);
    escribirRanking(posiciones[i], contenidoPosicion);
}

function listarRanking() {
    var cajon = document.getElementById('cajonDeSastre');
    cajon.innerHTML = "";
    var contenidoPosicion = Object();
    var posiciones = Array("uno", "dos", "tres", "cuatro", "cinco");
    var parrafo;
    for(var i = 0, fin = posiciones.length; i < fin; i++){
        contenidoPosicion = localStorage.getItem(posiciones[i]);
        contenidoPosicion = JSON.parse(contenidoPosicion);
        if(contenidoPosicion.intentos !== 0){
          parrafo = contenidoPosicion.nombre + " ha logrado superarlo en "+contenidoPosicion.intentos+ "intentos y en "  +contenidoPosicion.tiempo+" segundos";
          var nuevoPuesto = document.createElement('p');
          var parrafoNodo = document.createTextNode(parrafo);
          nuevoPuesto.appendChild(parrafoNodo);
          cajon.appendChild(nuevoPuesto);
        }

    }
}
function escribirRanking(posicion, contenido) {
    contenido = JSON.stringify(contenido);
    localStorage.setItem(posicion, contenido);

}
