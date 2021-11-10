var alfabeto = JSON.parse(localStorage.getItem('alfabeto'));
var estado1 = JSON.parse(localStorage.getItem('estado1'));
var estado2 = JSON.parse(localStorage.getItem('estado2'));
var T1 = JSON.parse(localStorage.getItem('transicion1'));
var T2 = JSON.parse(localStorage.getItem('transicion2'));

// Calculo de operaciones
function union (Estado_1, Estado_2, Alfabeto, Transiciones_1, Transiciones_2) {
    var Estados_neo = [['A', 'i']], Alfabeto_neo = [], Transicion_neo = [];
    var aux = [];
    console.log("----- UNION de automatas ------");

    /** Alfabeto */
    // Procedemos a guardar el Alfabeto.
    Alfabeto_neo = Alfabeto.slice();
    if (Alfabeto_neo.length != 0) {
        console.log("Alfabeto guardado con éxito");
        console.log(Alfabeto_neo);
    }
    else {
        console.error("No se pudo guardar el Alfabeto.");
    }

    /** Estados */
    // Procedemos a guardar los Estado_1.
    // Para ello guardamos en una variable auxiliar
    aux = Estado_1.slice();
    for (let i = 1; aux.length != 0; i++) {
        Estados_neo[i] = aux.shift();
        if (Estados_neo[i][1] == 'i') {
            Estados_neo[i][1] = 'n';
        }
    }
    // Verificamos
    if (Estados_neo.length != 0) {
        console.log("Estados del Automata de Pila 1, guardados con éxito.");
        console.log(Estados_neo);

        // Luego, procedemos con los Estados_2.
        aux = Estado_2.slice();
        for (let i = Estados_neo.length; aux != 0; i++) {
            Estados_neo[i] = aux.shift();
            if (Estados_neo[i][1] == 'i') {
                Estados_neo[i][1] = 'n';
            }
        }

        // Confirmamos de nuevo.
        if (Estados_neo.length == (Estado_1.length + Estado_2.length + 1)) {
            console.log("Estados del Automata de Pila 2, guardados con éxito.");
            console.log(Estados_neo);
        }
    }
    else {
        console.error("Ocurrió un error. No se puede proceder.");
        alert("Ocurrió un error. No se puede proceder.")
    }

    /** Transiciones */
    // Procedemos a guardar las Transiciones_1.
    aux = Transiciones_1.slice();
    for (let i = 0; aux != 0; i++) {
        if (i == 0) {
            Transicion_neo[i] = [Estados_neo[0][0], Estado_1[0][0], 'E', 'E', 'E'];
        }
        else {
            if (i == 1) {
                Transicion_neo[i] = [Estados_neo[0][0], Estado_2[0][0], 'E', 'E', 'E'];
            }
            else {
                Transicion_neo[i] = aux.shift();
            }
        }
    }

    // Verificamos
    if (Transicion_neo != 0) {
        console.log("Transiciones del Automata de Pila 1, guaradas con éxito.");
        console.log(Transicion_neo);

        aux = Transiciones_2.slice();
        for (let i = Transicion_neo.length; aux != 0; i++) {
            Transicion_neo[i] = aux.shift();
        }

        // Confirmamos de nuevo.
        if (Transicion_neo.length == (Transiciones_1.length + Transiciones_2.length + 2)) {
            console.log("Transiciones del Automata de Pila 2, guardados con éxito.");
            console.log(Transicion_neo);
        }
    }
    else {
        console.error("Ocurrió un error. No se puede proceder.");
        alert("Ocurrió un error. No se puede proceder");
    }

    /** Finalización */
    // Imprime en pagina
    var printUnion = document.getElementById('union');
    printUnion.innerHTML= '';
    // Estados
    var estadosH3 = document.createElement("h3");
    estadosH3.textContent = 'Estados';
    var estadosP = document.createElement("p");
    estadosP.textContent = Estados_neo;
    printUnion.appendChild(estadosH3);
    printUnion.appendChild(estadosP);
    // Alfabeto
    var alfabetoH3 = document.createElement("h3");
    alfabetoH3.textContent = 'Alfabeto';
    var alfabetoP = document.createElement("p");
    alfabetoP.textContent = Alfabeto_neo;
    printUnion.appendChild(alfabetoH3);
    printUnion.appendChild(alfabetoP);
    // Transicion
    var transicionTABLE = document.getElementById('unionTable');
    var transicionesH3 = document.createElement("h3");
    transicionesH3.textContent = 'Transición';
    printUnion.appendChild(transicionesH3);
    var i=0;
    do {
        var untr = document.createElement("tr");
        var untd1 = document.createElement("td");
        untd1.textContent = Transicion_neo[i][0];
        var untd2 = document.createElement("td");
        untd2.textContent = Transicion_neo[i][1];
        var untd3 = document.createElement("td");
        untd3.textContent = Transicion_neo[i][2];
        var untd4 = document.createElement("td");
        untd4.textContent = Transicion_neo[i][3];
        var untd5 = document.createElement("td");
        untd5.textContent = Transicion_neo[i][4];
        i++;
        untr.appendChild(untd1);
        untr.appendChild(untd2);
        untr.appendChild(untd3);
        untr.appendChild(untd4);
        untr.appendChild(untd5);
        transicionTABLE.appendChild(untr);
    } while (Transicion_neo[i]!=undefined);

    // Procedemos a retornar todo el nuevo Automata de Pila.
    return [Estados_neo, Alfabeto_neo, Transicion_neo];
}

function Concatenacion (Estado_1, Estado_2, Alfabeto, Transicion_1, Transicion_2) {
    var neoEstados = [], neoAlfabeto = [], neoTransiciones = [];

    console.log("----- CONCATEACION de automatas ------");

    // Guardamos los Estados y las Transiciones del Automata 1 en el nuevo Automata.
    neoEstados = Estado_1.slice();
    neoTransiciones = Transicion_1.slice();

    // Guardamos el Alfabeto
    for (let i = 1; i < Alfabeto.length; i++) {
        neoAlfabeto.push(Alfabeto[i]);
    }

    //Procedemos a generar las nuevas Transiciones
    let aux_estados = Estado_2.slice();
    for (let i = 0; i < aux_estados.length; i++) {
        i
        for (let k = 0; k < neoAlfabeto.length; k++) {
            k
            for (let q = 0; q < neoEstados.length; q++) {
                q
                if (neoEstados[q][1] == 'f') {
                    if (neoTransiciones[i][2] != neoAlfabeto[k]) {
                        var aux_transiciones = [neoEstados[q][0], aux_estados[i][0], neoAlfabeto[k], 'E', 'E'];
                        neoTransiciones.push(aux_transiciones);
                    }
                }
            }
        }
    }
    // Luego guardamos el resto de Transiciones.
    for (let i = 0; i < Transicion_2.length; i++) {
        neoTransiciones.push(Transicion_2[i]);
    }
    console.log("Así es como queda la nueva Transición:");
    console.log(neoTransiciones);

    // Guardamos el resto de los Estados.
    for (let i = neoEstados.length; aux_estados != 0; i++) {
        neoEstados[i] = aux_estados.shift();
        if (neoEstados[i][1] == 'i') {
            neoEstados[i][1] = 'n';
        }
    }
    console.log("Continuamos con como queda los nuevos Estados:");
    console.log(neoEstados);

    // Si el Automata 2 posee un Estado Inicial Final dejamos todo como está, a excepción del Estado Inicial que pasa a ser No Final.
    // En caso contrario, los Estados Finales del Automata 1 pasan a ser No Finales.
    aux_estados = Estado_2.slice();
    if (aux_estados[0][1] != 'if') {
        for (let i = 0; i < neoEstados.length - aux_estados.length; i++) {
            if (neoEstados[i][1] == 'f') {
                neoEstados[i][1] = 'n';

            }
            else {
                if (neoEstados[i][1] == 'if') {
                    neoEstados[i][1] = 'i';
                }
            }
        }
    }
    else {
        for (let i = 0; i < neoEstados.length; i++) {
            if (aux_estados[0] == neoEstados[i]) {
                neoEstados[i][1] = 'f';
            }
        }
    }

    /** Finalización */
    // Imprime en pagina
    var printConcatenacion = document.getElementById('concatenacion');
    printConcatenacion.innerHTML= '';
    // Estados
    var estadosH3 = document.createElement("h3");
    estadosH3.textContent = 'Estados';
    var estadosP = document.createElement("p");
    estadosP.textContent = neoEstados ;
    printConcatenacion.appendChild(estadosH3);
    printConcatenacion.appendChild(estadosP);
    // Alfabeto
    var alfabetoH3 = document.createElement("h3");
    alfabetoH3.textContent = 'Alfabeto';
    var alfabetoP = document.createElement("p");
    alfabetoP.textContent = neoAlfabeto;
    printConcatenacion.appendChild(alfabetoH3);
    printConcatenacion.appendChild(alfabetoP);
    // Transicion
    var transicionTABLE= document.getElementById('concatenacionTable');
    var transicionesH3 = document.createElement("h3");
    transicionesH3.textContent = 'Transición';
    printConcatenacion.appendChild(transicionesH3);
    var i=0;
    do {
        var untr = document.createElement("tr");
        var untd1 = document.createElement("td");
        untd1.textContent = neoTransiciones[i][0];
        var untd2 = document.createElement("td");
        untd2.textContent = neoTransiciones[i][1];
        var untd3 = document.createElement("td");
        untd3.textContent = neoTransiciones[i][2];
        var untd4 = document.createElement("td");
        untd4.textContent = neoTransiciones[i][3];
        var untd5 = document.createElement("td");
        untd5.textContent = neoTransiciones[i][4];
        i++;
        untr.appendChild(untd1);
        untr.appendChild(untd2);
        untr.appendChild(untd3);
        untr.appendChild(untd4);
        untr.appendChild(untd5);
        transicionTABLE.appendChild(untr);
    } while (neoTransiciones[i]!=undefined);


    // Retornamos el nuevo Automata.
    console.log("Después de todos los cambios, así queda nuestro Automata : ");
    console.log(neoEstados);
    console.log(neoAlfabeto);
    console.log(neoTransiciones);
    return [neoEstados, neoAlfabeto, neoTransiciones];
}

// Se auto-inician
union(estado1, estado2, alfabeto, T1, T2);
Concatenacion(estado1, estado2, alfabeto, T1, T2);
