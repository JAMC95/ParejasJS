window.onload = function(){
    generaNegras();
    var numeroCarta = generaLogica();
    generaEventos(numeroCarta.una, numeroCarta.dos);
}

function generaNegras(){
    var uno = document.getElementById('colum1');
    var dos = document.getElementById('colum2');
    var ruta = "img/inicial.jpg";
    var imagen;
   
    for(var i=0; i<10; i++){
        imagen = document.createElement('img');
        imagen.setAttribute('src', ruta);
        imagen.setAttribute('name', i);
        if(i<5){
          uno.appendChild(imagen);
        }else{
          dos.appendChild(imagen);
        }
        
    }
    
}

function generaLogica(){
    var arrUno = new Array();
    var arrDos = new Array();
    var objdeArray = new Object();
    var numeroA, numeroB;
    
    for(i = 0; i<5;i++){
        do{
            numeroA = Math.round(Math.random()*4);
          }while(comprobarNoRepetidos(numeroA, arrUno));
        arrUno[i] = numeroA;
        
        do{
            numeroB = Math.round(Math.random()*4);
          }while(comprobarNoRepetidos(numeroB, arrDos));
        
        arrDos[i] = numeroB;
    }
    
    console.log('uno', arrUno);
    console.log('dos', arrDos);
    
    objdeArray['una'] = arrUno;
    objdeArray['dos'] = arrDos;
    
    return objdeArray;
    
    /* Ya tengo dos arrays con los numeros, cada numero pertenece a una carta 
    TODO: Ahora lo que tenemos que hacer es añadir eventos para que al pulsar en una carta se voltee el numero que sea */
    
}

function comprobarNoRepetidos(valor, arr){
    var sw = false;
    for(var i=0, fin = arr.length; i<fin;i++){
        if(valor === arr[i]){
            sw = true;
        }
    }
    
    return sw;
}

function generaEventos(colu1, colu2){
    var uno = document.getElementById('colum1').getElementsByTagName('img');
    var dos = document.getElementById('colum2').getElementsByTagName('img');
  
    for(var i = 0, fin = uno.length; i<fin;i++){
        
        uno[i].addEventListener('click', function(e){
            
            this.setAttribute('src', 'img/'+ colu1[this.name]+ '.jpg');
        })
    }
     for(var i = 0, fin = dos.length; i<fin;i++){
        dos[i].addEventListener('click', function(){
           this.setAttribute('src', 'img/'+ colu2[this.name-i] + '.jpg');
        })
    }
}