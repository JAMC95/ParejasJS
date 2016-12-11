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

    lista[0].addEventListener('click', function(){
       tiempo = 0;
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

    var numeroA;
    var rondaUno = numero/2;

    for(i = 0; i<rondaUno;i++){
        do{
            numeroA = Math.round(Math.random()*4);
          }while(comprobarNoRepetidos(numeroA, arrRandom, 1));
        arrRandom[i] = numeroA;
    }
    for(var i = rondaUno, fin=numero; i<fin;i++){
      do{
            numeroA = arrRandom[Math.round(Math.random()*rondaUno)];
          }while(comprobarNoRepetidos(numeroA, arrRandom, 2));
        arrRandom[i] = numeroA;
    }

   console.log(arrRandom)

    return arrRandom;

}

/* Comprueba que no haya repetidos dentro de los dos arrays*/
function comprobarNoRepetidos(valor, arrRandom, limite){
    var contador = 0;
    for(var i=0, fin = arrRandom.length; i<fin;i++){
        if(valor === arrRandom[i]){
            contador++;
        }
    }
    return contador>=limite;
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

           for(var i = 0, fin = imagenes.length;i<fin;i++){
            if(nodoAnterior!=undefined)
            nodoAnterior.setAttribute('src', 'images/inicial.jpg');

        }
        numParUno = numParDos; numParDos = null;
        intentos++;

    }
    if(numParUno===numParDos){
        numParUno = null; numParDos = null;
        aciertos++;

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
    for(var i = 0, fin = posiciones.length; i < fin; i++){
      contenidoPosicion = localStorage.getItem(posiciones[i]);
      contenidoPosicion = JSON.parse(contenidoPosicion);
      if(contenidoPosicion.intentos < intentos){
        contenidoPosicion.nombre = nombre;
        contenidoPosicion.intentos = intentos;
        contenidoPosicion.tiempo = tiempo;
      }
    }
}

function listarRanking() {
    var cajon = document.getElementById('cajonDeSastre');
    var contenidoPosicion = Object();
    var posiciones = Array("uno", "dos", "tres", "cuatro", "cinco");
    var parrafo;
    for(var i = 0, fin = posiciones.length; i < fin; i++){
      contenidoPosicion = localStorage.getItem(posiciones[i]);
      contenidoPosicion = JSON.parse(contenidoPosicion);
        parrafo = contenidoPosicion.nombre + "ha logrado superarlo en "+contenidoPosicion.intentos+ "intentos y en "  +contenidoPosicion.tiempo+" segundos";
        var nuevoPuesto = createElement('p');
        var parrafoNodo = createTextNode(parrafo);
        nuevoPuesto.appendChild(parrafoNodo);
        cajon.appendChild(nuevoPuesto);
    }
}
