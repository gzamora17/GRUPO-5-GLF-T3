var updateAlfabeto = document.getElementById('size-alfabeto');
var updateEstadoAP1 = document.getElementById('estadosA1');
var updateEstadoAP2 = document.getElementById('estadosA2');
var updateEtiquetasAP1 = document.getElementById('etiquetasA1');
var updateEtiquetasAP2 = document.getElementById('etiquetasA2');

var alfabeto=[]
var Bool=false;

var PILAEST1=[]
var PILATRA2=[]

var PILAEST2=[]
var PILATRA2=[]

function InsertarAlfabeto(){
    alfabeto=[];
    var NumeroIngresado = document.getElementById("size-alfabeto").value;
    alfabeto.push("E");

    if((NumeroIngresado>0)&&(NumeroIngresado<702)){
        var aux;
        var Textaux;
        var textaux2;
        for(i=0;i<NumeroIngresado;i++){
             if(i<=25){
                  aux=97+i;
                  aux=String.fromCharCode(aux);
                }else{
                    textaux=96+(Math.trunc(i/26));
                    textaux=String.fromCharCode(textaux);
                    textaux2=97+(i-(26*(Math.trunc(i/26))));
                    textaux2=String.fromCharCode(textaux2);
                    aux=textaux.concat(textaux2);
                }
                alfabeto.push(aux);
        }
        console.log("alfabeto agregado correctamente");
        console.log(alfabeto);
        localStorage.setItem('alfabeto', JSON.stringify(alfabeto));
    }else{
       console.error("debe ingresar un número mayor a 1 y menor a 702");
       alert("debe ingresar un número mayor a 1 y menor a 702");
    }
}

function InsertarEstadosPila(a){
    var letra1="k";
    var letra2="j";
    var textaux;
    var boolt=a;

    if(boolt==true){
        var Numero1Ingresado = document.getElementById("estadosA1").value;

        PILAEST1=[];
        for(i=0;i<Numero1Ingresado;i++){
            textaux=letra1.concat(i);
            PILAEST1.push([textaux,"n"]);
        }
        for(j=0;j<PILAEST1.length;j++){
            if(j==0){
                PILAEST1[j][1]="i";
            }else{
                if(j=(Numero1Ingresado-1)){
                    PILAEST1[j][1]="f"
                }
            }
        }
        console.log("estados ingresados correctamente");
        console.log(PILAEST1);
        localStorage.setItem('estado1', JSON.stringify(PILAEST1));
    }else{
        var Numero2Ingresado = document.getElementById("estadosA2").value;

        if(Numero2Ingresado>0){
            validacion=true;
        }else{
            console.error("numero debe ser mayor que 0");
            alert("numero debe ser mayor que 0");
        }
        PILAEST2=[];
        for(i=0;i<Numero2Ingresado;i++){
            textaux=letra2.concat(i);
            PILAEST2.push([textaux,"n"]);
        }
        for(j=0;j<PILAEST2.length;j++){
            if(j==0){
                PILAEST2[j][1]="i";
            }else{
                if(j=(Numero2Ingresado-1)){
                    PILAEST2[j][1]="f"
                }
            }
        }
        console.log("estados ingresados correctamente");
        console.log(PILAEST2);
        localStorage.setItem('estado2', JSON.stringify(PILAEST2));
    }
}

function InsertarTrancionespila(a){
    var boolt=a;
    var validacion=false;

    if(boolt==true){
        PILATRA1=[];
    }else{
        PILATRA2=[];
    }

    if(boolt==true){
        var size = PILAEST1.length*2 - 1;
        for(var i=1;i<=size;i++){
            var Estado1Ingresado = document.getElementById("inicio"+i).value;
            var Estado2Ingresado = document.getElementById("termino"+i).value;
            var ABCIngresado = document.getElementById("alfabeto"+i).value;
            var ElementoExtraido=document.getElementById("elementoE"+i).value;
            var ElementoAgregado=document.getElementById("elementoA"+i).value;
            PILATRA1.push([Estado1Ingresado,Estado2Ingresado,ABCIngresado,ElementoExtraido,ElementoAgregado]);
        }
        if(size>1){
            if(PILATRA1.length==(2*PILAEST1.length)-1){
                var cont1=0;
                var cont2=0;
                for(j=0;j<PILAEST1.length;j++){
                    for(k=0;k<PILATRA1.length;k++){
                        if(PILATRA1[k][0]==PILAEST1[j][0]){
                            cont1++;
                        }
                    }
                    if(cont1==2){
                        cont2++;
                    }
                    cont1=0;
                }
                if(cont2==PILAEST1.length-1){
                    cont1=0;
                    cont2=0;
                    for(m=0;m<PILATRA1.length;m++){
                        for(n=0;n<PILAEST1.length;n++){
                            if((PILAEST1[n][0]==PILATRA1[m][0])||(PILAEST1[n][0]==PILATRA1[m][1])){
                                 if(PILATRA1[m][0]==PILATRA1[m][1]){
                                     cont1+=2;
                                    }else{
                                        cont1++;
                                    }
                            }
                        }
                        if(cont1==2){
                            cont2++;
                        }
                        cont1=0;
                    }
                    if(cont2==PILATRA1.length){
                        validacion=true;
                    }else{
                        console.error("estado de transicion no presente en los ingresados previamente");
                        alert("estado de transicion no presente en los ingresados previamente");
                    }
                }else{
                    console.error("número de transisiones ingresadas no corresponde con el número de estados");
                    alert("número de transisiones ingresadas no corresponde con el número de estados");
                }
            }else{
                console.error("número de transisiones ingresadas no corresponde con el número de estados");
                alert("número de transisiones ingresadas no corresponde con el número de estados");
            }
        }else{
            console.error("número ingresado debe ser un numero mayor 0");
            alert("número ingresado debe ser un numero mayor 0");
        }
    }else{
        var size = PILAEST2.length*2 - 1;
        for(var i=1;i<=size;i++){
            var Estado1Ingresado = document.getElementById("inicio"+i).value;
            var ABCIngresado = document.getElementById("alfabeto"+i).value;
            var Estado2Ingresado = document.getElementById("termino"+i).value;
            var ElementoExtraido=document.getElementById("elementoE"+i).value;
            var ElementoAgregado=document.getElementById("elementoA"+i).value;
            PILATRA2.push([Estado1Ingresado,Estado2Ingresado,ABCIngresado,ElementoExtraido,ElementoAgregado]);
        }

        if(size>1){
            if(PILATRA2.length==(2*PILAEST2.length)-1){
                var cont1=0;
                var cont2=0;
                for(j=0;j<PILAEST2.length;j++){
                    for(k=0;k<PILATRA2.length;k++){
                        if(PILATRA2[k][0]==PILAEST2[j][0]){
                            cont1++;
                        }
                    }
                    if(cont1==2){
                        cont2++;
                    }
                    cont1=0;
                }
                if(cont2==PILAEST2.length-1){
                    cont1=0;
                    cont2=0;
                    for(m=0;m<PILATRA2.length;m++){
                        for(n=0;n<PILAEST2.length;n++){
                            if((PILAEST2[n][0]==PILATRA2[m][0])||(PILAEST2[n][0]==PILATRA2[m][1])){
                                 if(PILATRA2[m][0]==PILATRA2[m][1]){
                                     cont1+=2;
                                    }else{
                                        cont1++;
                                    }
                            }
                        }
                        if(cont1==2){
                            cont2++;
                        }
                        cont1=0;
                    }
                    if(cont2==PILATRA2.length){
                        validacion=true;
                    }else{
                        console.error("estado de transicion no presente en los ingresados previamente");
                        alert("estado de transicion no presente en los ingresados previamente");
                    }
                }else{
                    console.error("número de transisiones ingresadas no corresponde con el número de estados");
                    alert("número de transisiones ingresadas no corresponde con el número de estados");
                }
            }else{
                console.error("número de transisiones ingresadas no corresponde con el número de estados");
                alert("número de transisiones ingresadas no corresponde con el número de estados");
            }
        }else{
            console.error("Numero ingresado debe ser un numero mayor 0");
            alert("Numero ingressizeado debe ser un numero mayor 0");
        }

    }

    if(validacion == false){
        if(boolt==true){
            PILATRA1=[];
        }else{
            PILATRA2=[];
        }
    }else{
        if(boolt==true){
            console.log("Transiciones agregadas adecuadamente");
            console.log(PILATRA1);
            localStorage.setItem('transicion1', JSON.stringify(PILATRA1));
        }else{
            console.log("Transiciones agregadas adecuadamente");
            console.log(PILATRA2);
            localStorage.setItem('transicion2', JSON.stringify(PILATRA2));
        }
    }
    document.getElementById('transicion-input1').innerHTML= '';
    document.getElementById('transicion-input2').innerHTML= '';
}

function updateTableAP() {
        var estadosA1 = document.getElementById('estadosA1').value;
        var estadosA2 = document.getElementById('estadosA2').value;
        var tablaAP = document.getElementById('tabla-automataAP');
        tablaAP.innerHTML = '';
        var mayor = 0;

        // El mayor entre [EstadosA1, EstadosA2 y el tamaño del Alfabeto]
        if ( (alfabeto.length >= estadosA1) && (alfabeto.length >= estadosA2) ) {
            mayor = alfabeto.length;
        }
        else if ( (estadosA1>alfabeto.length) && (estadosA1>estadosA2) ) {
            mayor = estadosA1;
        }
        else {
            mayor = estadosA2;
        }

        for (var i=0; i<mayor; i++) {
            var untr = document.createElement("tr");
            var untd1 = document.createElement("td");
            untd1.textContent = alfabeto[i];
            var untd2 = document.createElement("td");
            untd2.textContent = PILAEST1[i];
            var untd3 = document.createElement("td");
            untd3.textContent = PILAEST2[i];
            untr.appendChild(untd1);
            untr.appendChild(untd2);
            untr.appendChild(untd3);
            tablaAP.appendChild(untr);
        }
}


// Crea los recuadros para ingresar transiciones
var inputTransicion = function(transicion) {
    var div = document.createElement("div");
    document.getElementById(transicion).appendChild(div);
    // Set div ID: Trans+#n
    div.setAttribute("id", "Trans" + document.getElementById(transicion).childElementCount);
    div.setAttribute("style", "padding:10px 0px; display:flex; justify-content:space-around;");

    // Set inputs: inicio
    var inicio = document.createElement("input")
    inicio.setAttribute("id", "inicio" + document.getElementById(transicion).childElementCount);
    inicio.setAttribute("type","text");
    inicio.setAttribute("placeholder", "Inicio");
    inicio.setAttribute("style", "padding:10px 5px; width:80px;");

    // Set inputs: alfabeto
    var alfabeto = document.createElement("input")
    alfabeto.setAttribute("id", "alfabeto" + document.getElementById(transicion).childElementCount);
    alfabeto.setAttribute("type","text");
    alfabeto.setAttribute("placeholder", "Alfabeto");
    alfabeto.setAttribute("style", "padding:10px 5px; width:80px;");

    // Set inputs: termino
    var termino = document.createElement("input")
    termino.setAttribute("id", "termino" + document.getElementById(transicion).childElementCount);
    termino.setAttribute("type","text");
    termino.setAttribute("placeholder", "Termino");
    termino.setAttribute("style", "padding:10px 5px; width:80px;");

    // Set inputs: Extraido
    var elementoE = document.createElement("input")
    elementoE.setAttribute("id", "elementoE" + document.getElementById(transicion).childElementCount);
    elementoE.setAttribute("type","text");
    elementoE.setAttribute("placeholder", "Extraido");
    elementoE.setAttribute("style", "padding:10px 5px; width:80px;");

    // Set inputs: Añadido
    var elementoA = document.createElement("input")
    elementoA.setAttribute("id", "elementoA" + document.getElementById(transicion).childElementCount);
    elementoA.setAttribute("type","text");
    elementoA.setAttribute("placeholder", "Añadido");
    elementoA.setAttribute("style", "padding:10px 5px; width:80px;");

    // Append inputs
    div.appendChild(inicio);
    div.appendChild(alfabeto);
    div.appendChild(termino);
    div.appendChild(elementoE);
    div.appendChild(elementoA);
};

function transicionesAP(a) {
    bool= a;
    // SI es automata 1
    if(bool == true) {
        document.getElementById('transicion-input1').innerHTML= '';
        for(var i=0; i<PILAEST1.length*2-1; i++){
            inputTransicion('transicion-input1');
        }
    }
    else {
        // Sino es automata2
        document.getElementById('transicion-input2').innerHTML= '';
        for(var i=0; i<PILAEST2.length*2-1; i++){
            inputTransicion('transicion-input2');
        }
    }
}

updateAlfabeto.addEventListener("keydown", function () {
    InsertarAlfabeto();
    updateTableAP();
});
updateEstadoAP1.addEventListener("keydown", function () {
    InsertarEstadosPila(true);
    updateTableAP();
});
updateEstadoAP2.addEventListener("keydown", function () {
    InsertarEstadosPila(false);
    updateTableAP();
});
