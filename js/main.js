var numParUno =null, numParDos=null, nodoAnterior = null, intentos=0, fallos=0, tiempo = 0, aciertos = 0;
setInterval(function(){
    tiempo++;
}, 1000);
window.onload = setenta;
    
function setenta(){
    var ob = new Date();
    generaNegras();
    var numeroCarta = generaLogica();
    var xx = generaEventos(numeroCarta.una, numeroCarta.dos);
    document.getElementById('button').addEventListener(function(){
        //TODO: Hacer función para leer el ranking
    })
    
    

}
/* Genera las cartas negras, o cartas "volteadas"*/
function generaNegras(){
    var uno = document.getElementById('colum1');
    var dos = document.getElementById('colum2');
    var ruta = "img/inicial.jpg";
    var imagen;
   
    for(var i=0; i<10; i++){
        imagen = document.createElement('img');
        imagen.setAttribute('src', ruta);
        
        if(i<5){
          uno.appendChild(imagen);
          imagen.setAttribute('name', i);
        }else{
          dos.appendChild(imagen);
          imagen.setAttribute('name', i-5);
        }
        
    }
    
}
/* No le entra nada, devuelve un bojeto con dos arrays (se pueden poner mas) en los que traen 5 numeros al azar del 0 al 4*/
function generaLogica(){
    var arrUno = new Array();
    var arrDos = new Array();
    var objdeArray = new Object();
    var numeroA, numeroB;
    
    for(i = 0; i<5;i++){
        do{
            numeroA = Math.round(Math.random()*4);
          }while(comprobarNoRepetidos(numeroA, arrUno, arrDos));
        arrUno[i] = numeroA;
        
        do{
            numeroB = Math.round(Math.random()*4);
          }while(comprobarNoRepetidos(numeroB, arrUno,arrDos));
        
        arrDos[i] = numeroB;
    }
    
    console.log('uno', arrUno);
    console.log('dos', arrDos);
    
    objdeArray['una'] = arrUno;
    objdeArray['dos'] = arrDos;
    
    return objdeArray;
    
    
}
/* Comprueba que no haya repetidos dentro de los dos arrays*/ 
function comprobarNoRepetidos(valor, arrU, arrD){
    var contador = 0;
    for(var i=0, fin = arrU.length; i<fin;i++){
        if(valor === arrU[i]){
            contador++;
        }
    }
    
     for(var i=0, fin = arrD.length; i<fin;i++){
        if(valor === arrD[i]){
            contador++;
        }
    }
   
    return contador>=2;
}

/*Genera los eventos en las imagenes de las columnas que les pases. Se resta i a partir de la fila dos*/
function generaEventos(colu1, colu2){
    var uno = document.getElementById('colum1').getElementsByTagName('img');
    var dos = document.getElementById('colum2').getElementsByTagName('img');
  
    for(var i = 0, fin = uno.length; i<fin;i++){
        uno[i].addEventListener('click', function(){
            this.setAttribute('src', 'img/'+ colu1[this.name]+ '.jpg');
            
            comprobador(colu1[this.name],this);
        })
    }
     for(var i = 0, fin = dos.length; i<fin;i++){
        dos[i].addEventListener('click', function(){
           this.setAttribute('src', 'img/'+ colu2[this.name] + '.jpg');
           comprobador(colu2[this.name], this);

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
            
            nodoAnterior.setAttribute('src', 'img/inicial.jpg');
              
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
    if(aciertos===5){
        alert('Ganaste, en '+ intentos + ' y en nada menos que '+tiempo+' segundos');
        var caja = document.createElement('input');
        caja.setAttribute('id', 'nombre');
        var boton = document.createElement('button');
        boton.innerHTML= "Enviar"
        boton.addEventListener('click', function(){
            var txt = document.getElementById('nombre').value;
            localStorage.setItem(txt, intentos +"*"+tiempo);
            reseteaJuego();
           
        })
        document.getElementById('colum3').appendChild(caja);
        document.getElementById('colum3').appendChild(boton);
      
    }
  
}

function reseteaJuego(){
    tiempo = 0;
    intentos = 0;
    aciertos = 0;
    document.getElementById('colum1').innerHTML = "";
    document.getElementById('colum2').innerHTML = "";
    document.getElementById('colum3').innerHTML = "";
    setenta();
}