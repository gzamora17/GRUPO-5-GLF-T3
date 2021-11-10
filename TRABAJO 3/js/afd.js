var updateAlfabeto = document.getElementById('size-alfabeto');
var updateEstadoAFD = document.getElementById('estadosA');
var updateEtiquetasAFD = document.getElementById('etiquetasA');

var alfabeto=[]
var Bool=false;
var AFDEST=[];
var AFDTRA=[];

function InsertarAlfabeto(){
    alfabeto=[];
    var NumeroIngresado = document.getElementById("size-alfabeto").value;

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
       console.error("Debe ingresar un número mayor a 1 y menor a 702");
       alert("Debe ingresar un número mayor a 1 y menor a 702");
    }
}

function InsertarEstadosAFD(){
    AFDEST=[];
    var Numero1Ingresado = document.getElementById("estadosA").value;
    var letra="q";
    var textaux;
    var validacion=false;

    if(Numero1Ingresado>0){
        validacion=true;
    }else{
        console.error("numero debe ser mayor que 0");
        alert("numero debe ser mayor que 0");
    }

    if(validacion==true){
        for(i=0;i<Numero1Ingresado;i++){
            textaux=letra.concat(i);
            AFDEST.push([textaux,"n"]);
        }
        console.log("Estados ingresados correctamente");
        console.log(AFDEST);
        localStorage.setItem('estado', JSON.stringify(AFDEST));
    }

}

function InsertarEtiquetas(){
    var NumeroIngresado = document.getElementById("etiquetasA").value;
    var BoolIngresado = document.getElementById("etiquetaBool").checked;
    validacion=false;

    if(AFDEST.length > NumeroIngresado){
        validacion=true;
    }else{
        console.error("Numero de estados finales mayor de lo permitido");
        alert("Numero de estados finales mayor de lo permitido");
    }

    if(validacion==true){
        for(i=0;i<AFDEST.length;i++){
            AFDEST[i][1]="n";
        }
        for(j=0;j<AFDEST.length;j++){
            if(j==0){
                if(BoolIngresado==false){
                    AFDEST[j][1]="i";
                }else{
                    AFDEST[j][1]="if";
                }
            }else{
                if(j>=((AFDEST.length)-NumeroIngresado)){
                    AFDEST[j][1]="f"
                }
            }
        }
        console.log("las etiquetas se actualizado adecuadamente");
        console.log(AFDEST);
        localStorage.setItem('estado', JSON.stringify(AFDEST));
    }
}

function InsertarTrancionesAFD(){
    var validacion=false;
    var size = alfabeto.length*AFDEST.length;
    AFDTRA=[];

    for(i=1;i<=size;i++){
        var Estado1Ingresado = document.getElementById("inicio"+i).value;
        var Estado2Ingresado = document.getElementById("termino"+i).value;
        var ABCIngresado = document.getElementById("alfabeto"+i).value;
        AFDTRA.push([Estado1Ingresado,ABCIngresado,Estado2Ingresado]);
    }

    if(size>1){
        if(size == (alfabeto.length*AFDEST.length)){
            var cont1=0;
            for(j=0;j<alfabeto.length;j++){
                var cont2=0;
                for(k=0;k<AFDTRA.length;k++){
                    if(alfabeto[j]==AFDTRA[k][1]){
                        cont2++;
                    }
                }
                if(cont2==AFDEST.length){
                    cont1++;
                }
            }
            if(cont1==alfabeto.length){
                cont1=0;
                cont2=0;
                for(m=0;m<AFDTRA.length;m++){
                    for(n=0;n<AFDEST.length;n++){
                        if((AFDEST[n][0]==AFDTRA[m][0])||(AFDEST[n][0]==AFDTRA[m][2])){

                             if(AFDTRA[m][0]==AFDTRA[m][2]){
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
                if(cont2==AFDTRA.length){
                    validacion=true;
                }else{
                    console.error("estado de transicion no presente en los ingresados previamente");
                    alert("estado de transicion no presente en los ingresados previamente");
                }
            }else{
                console.error("número de veces que se uso cada elemento del alfabeto no corresponde con el tipo de automata");
                alert("número de veces que se uso cada elemento del alfabeto no corresponde con el tipo de automata");
            }
        }else{
            console.error("número de transiciones no correspondiente con el tipo de automata");
            alert("número de transiciones no correspondiente con el tipo de automata");
        }
    }else{
        console.error("número ingresado debe ser un numero mayor 0");
        alert("número ingresado debe ser un numero mayor 0");
    }

    if(validacion == false){
        AFDTRA=[];
    }else {
        console.log("Las Transiciones se actualizado adecuadamente");
        console.log(AFDTRA);
        localStorage.setItem('transicion', JSON.stringify(AFDTRA));
    }
}

function updateTableAFD() {
    var estadosA = document.getElementById("estadosA").value;
    var tablaAFD = document.getElementById('tabla-automataAFD');
    tablaAFD.innerHTML = "";
    var mayor = 0;

        if (estadosA > alfabeto.length) {
            mayor = estadosA;
        }
        else {
            mayor = alfabeto.length;
        }
        for (var i = 0; i < mayor; i++) {
            var untr = document.createElement("tr");
            var untd1 = document.createElement("td");
            untd1.textContent = alfabeto[i];
            var untd2 = document.createElement("td");
            untd2.textContent = AFDEST[i];
            untr.appendChild(untd1);
            untr.appendChild(untd2);
            tablaAFD.appendChild(untr);
        }
}


// Crea los recuadros para ingresar transiciones
var inputTransicion = function() {
    var div = document.createElement("div");
    document.getElementById('transicion-input').appendChild(div);
    // Set div ID: Trans+#n
    div.setAttribute("id", "Trans" + document.getElementById('transicion-input').childElementCount);
    div.setAttribute("style", "padding:10px 0px; display:flex; justify-content:space-around;");

    // Set inputs: inicio
    var inicio = document.createElement("input")
    inicio.setAttribute("id", "inicio" + document.getElementById('transicion-input').childElementCount);
    inicio.setAttribute("type","text");
    inicio.setAttribute("placeholder", "Inicio");
    inicio.setAttribute("style", "padding:10px; width:100px;");

    // Set inputs: alfabeto
    var alfabeto = document.createElement("input")
    alfabeto.setAttribute("id", "alfabeto" + document.getElementById('transicion-input').childElementCount);
    alfabeto.setAttribute("type","text");
    alfabeto.setAttribute("placeholder", "Alfabeto");
    alfabeto.setAttribute("style", "padding:10px; width:100px;");

    // Set inputs: termino
    var termino = document.createElement("input")
    termino.setAttribute("id", "termino" + document.getElementById('transicion-input').childElementCount);
    termino.setAttribute("type","text");
    termino.setAttribute("placeholder", "Término");
    termino.setAttribute("style", "padding:10px; width:100px;");

    // Append inputs
    div.appendChild(inicio);
    div.appendChild(alfabeto);
    div.appendChild(termino);
};

function transicionesAFD() {
    document.getElementById('transicion-input').innerHTML="";
    for(var i=0; i<AFDEST.length*alfabeto.length; i++){
        inputTransicion();
    }
}

updateAlfabeto.addEventListener("keydown", function () {
    InsertarAlfabeto();
    updateTableAFD();
});
updateEstadoAFD.addEventListener("keydown", function () {
    InsertarEstadosAFD();
    updateTableAFD();
});
updateEtiquetasAFD.addEventListener("keydown", function () {
    InsertarEtiquetas();
    updateTableAFD();
});
