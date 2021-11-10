var alfabeto = JSON.parse(localStorage.getItem('alfabeto'));
var estado = JSON.parse(localStorage.getItem('estado'));
var transicion = JSON.parse(localStorage.getItem('transicion'));

function siSonIguales(matriz, alfaA) {
    var arrayConjunto = [], alfaConjunto = alfaA;
    var k = 0, f = 1;
    arrayConjunto = matriz, alfaConjunto = alfaA;

    do {
        if (JSON.stringify(arrayConjunto[k]) == JSON.stringify(arrayConjunto[f])) {
            arrayConjunto.splice(f, 1);
            f++;
            if (f < arrayConjunto.length) {
                k++, f = k + 1;
            }
        } else {
            f++;
            if (f < arrayConjunto.length) {
                k++, f = k + 1;
            }
        }
    } while (k < arrayConjunto.length && f < arrayConjunto.length);

    return arrayConjunto;
}

function MatrizDest(tran, estad, alf) {
    var estadoAux = [], transAux = [], alfaCompleto = [];
    estadoAux = estad, transAux = tran, alfaCompleto = alf;
    var matrizDestinos = []; ingresoDestino = [], validaAlfabeto = [], v = 0, x = 0, k = 0, cont1 = 0;
    do {
        do {
            for (x; x < transAux.length; x++) {
                if (estadoAux[v][0] == transAux[x][0] && alfaCompleto[k] == transAux[x][1]) {
                    cont1++;
                }
            }
            validaAlfabeto.push(cont1);
            cont1 = 0, x = 0, k++;
        } while (k < alfaCompleto.length);
        console.log(validaAlfabeto);
        k = 0, x = 0;
        var n = 0;
        do {
            if (validaAlfabeto[n] == 0) {
                ingresoDestino.push("-");
                n++;
            } else {
                if (validaAlfabeto[n] >= 1) {
                    var ñ = 0
                    do {
                        if (estadoAux[v][0] == transAux[x][0] && alfaCompleto[n] == transAux[x][1]) {
                            ingresoDestino.push(transAux[x][2]);
                            ñ = 1;
                        } else {
                            x++;
                        }
                    } while (ñ == 0);
                    x = 0, n++;
                }
            }
        } while (n < validaAlfabeto.length);
        matrizDestinos.push(ingresoDestino);
        ingresoDestino = [], validaAlfabeto = [], x = 0, n = 0, k = 0, v++;
    } while (v < estadoAux.length);
    return matrizDestinos;
}

function AFDtoER(Estado, Trans1, Alfabeto) {
    var estadoAux = [], transAux = [], alfaCompleto = [];
    var EstadoI = ['I', 'i'], EstadoF = ['F', 'f'];
    estadoAux = Estado, transAux = Trans1, alfaAux = Alfabeto;
    alfaCompleto.push("E");
    for (var t = 0; t < Alfabeto.length; t++) {
        alfaCompleto.push(Alfabeto[t]);
    }

    var tAlInicio = [];
    for (var e = 0; e < estadoAux.length; e++) {
        if (estadoAux[e][1] == "i") {
            estadoAux[e][1] = "n";
            tAlInicio.push(EstadoI[0][0]);
            tAlInicio.push(alfaCompleto[0]);
            tAlInicio.push(estadoAux[e][0]);
            transAux.splice(0, 0, tAlInicio);
            tAlFinal = [];
        }
    }
    var tAlFinal = [];
    for (var r = 0; r < estadoAux.length; r++) {
        if (estadoAux[r][1] == "f") {
            estadoAux[r][1] = "n";
            tAlFinal.push(estadoAux[r][0]);
            tAlFinal.push(alfaCompleto[0]);
            tAlFinal.push(EstadoF[0][0]);
            transAux.push(tAlFinal);
            tAlFinal = [];
        }
    }
    console.log("Nuevas transiciones: ");
    console.log(transAux);

    estadoAux.splice(0, 0, EstadoI), estadoAux.push(EstadoF);
    console.log("Nuevos Estados: ");
    console.log(estadoAux);

    var matrizDestinos = [];
    matrizDestinos = MatrizDest(transAux, estadoAux, alfaCompleto);

    var contEst = 0;
    do {
        var aquiParte, esteFuera, aquiTermina;
        if (estadoAux[contEst][0] != "F") {
            var stop = 0, validaEntremedio = 0;
            aquiParte = estadoAux[contEst][0];
            for (var iu = 0; stop != 1 && iu < alfaCompleto.length; iu++) {
                if (matrizDestinos[contEst][iu] != aquiParte && matrizDestinos[contEst][iu] != "I" && matrizDestinos[contEst][iu] != "-") {
                    stop = 1, esteFuera = matrizDestinos[contEst][iu], validaEntremedio = 0;
                } else {
                    stop = 0, validaEntremedio = 1;
                }
            }
            validaEntremedio
            if (validaEntremedio == 1) {
                contEst++;
            } else {
                for (var ge = 0; ge < estadoAux.length; ge++) {
                    if (esteFuera == estadoAux[ge][0]) {
                        var hjo = ge;
                    }
                }
                var stop2 = 0, validaFinal = 0;
                for (var plz = 0; stop2 != 1 && plz < transAux.length; plz++) {
                    if (transAux[plz][2] != "I" && transAux[plz][2] != "-" && transAux[plz][2] != esteFuera && transAux[plz][0] == esteFuera && transAux[plz][2] != aquiParte) {
                        aquiTermina = transAux[plz][2];
                        stop2 = 1, validaFinal = 0;
                    } else {
                        stop2 = 0, validaFinal = 1;
                    }
                }
            }
            validaEntremedio

            if (validaEntremedio == 0 && validaFinal == 0) {
                var hayBucle = 0, hayBucle2 = 0;
                for (var tet = 0; tet < alfaCompleto.length; tet++) {
                    if (matrizDestinos[contEst][tet] == aquiParte && matrizDestinos[contEst][tet] != "-") {
                        hayBucle = 1;
                    }
                }
                for (var tet = 0; tet < alfaCompleto.length; tet++) {
                    if (matrizDestinos[hjo][tet] == esteFuera && matrizDestinos[hjo][tet] != "-") {
                        hayBucle2 = 1;
                    }
                }
                if (hayBucle == 1) {
                    var algo = "k";
                    for (var tyo = 0; tyo < alfaCompleto.length; tyo++) {
                        if (matrizDestinos[contEst][tyo] == aquiParte) {
                            algo = algo + "+" + alfaCompleto[tyo];
                        }
                    }
                    var algo2 = algo.slice(2, algo.length);
                    algo2 = "(" + algo2 + ")*";
                    var otro = "k";
                    for (var wvm = 0; wvm < alfaCompleto.length; wvm++) {
                        if (matrizDestinos[contEst][wvm] == esteFuera) {
                            otro = otro + alfaCompleto[wvm];
                        }
                    }
                    var otro2 = otro.slice(1, otro.length);

                    if (hayBucle2 == 1) {
                        var algo3 = "k";
                        for (var tyo = 0; tyo < alfaCompleto.length; tyo++) {
                            if (matrizDestinos[hjo][tyo] == esteFuera) {
                                algo3 = algo3 + "+" + alfaCompleto[tyo];
                            }
                        }
                        var algo4 = algo3.slice(2, algo3.length);
                        algo4 = "(" + algo4 + ")*";
                        var otro3 = "k";
                        for (var wvm = 0; wvm < alfaCompleto.length; wvm++) {
                            if (matrizDestinos[hjo][wvm] == aquiTermina) {
                                otro3 = otro3 + alfaCompleto[wvm];
                            }
                        }
                        var otro4 = otro3.slice(1, otro3.length);
                        var exp = "(" + algo2 + otro2 + ")(" + algo4 + otro4 + ")";

                        for (var klo = 0; klo < transAux.length; klo++) {
                            if (transAux[klo][2] == esteFuera && transAux[klo][0] == aquiParte) {
                                transAux[klo][2] = aquiTermina;
                                transAux[klo][1] = exp;
                            } else {
                                if (transAux[klo][0] == aquiParte && transAux[klo][2] == aquiTermina) {
                                    transAux[klo][1] = exp;
                                } else {
                                    if (transAux[klo][0] == esteFuera) {
                                        transAux.splice(klo, 1);
                                        klo = 0;
                                    } else {
                                        if (transAux[klo][2] == esteFuera) {
                                            transAux.splice(klo, 1);
                                            klo = 0;
                                        }
                                    }
                                }
                            }
                        }
                        transAux = siSonIguales(transAux, alfaCompleto);
                        estadoAux.splice(hjo, 1);
                        alfaCompleto.push(exp);
                        matrizDestinos = MatrizDest(transAux, estadoAux, alfaCompleto);
                        contEst = 0;
                    } else {
                        var otro3 = "k";
                        for (var wvm = 0; wvm < alfaCompleto.length; wvm++) {
                            if (matrizDestinos[hjo][wvm] == aquiTermina) {
                                otro3 = otro3 + alfaCompleto[wvm];
                            }
                        }
                        var otro4 = otro3.slice(1, otro3.length);
                        var exp = "(" + algo2 + otro2 + ")(" + otro3 + ")";
                        for (var klo = 0; klo < transAux.length; klo++) {
                            if (transAux[klo][2] == esteFuera && transAux[klo][0] == aquiParte) {
                                transAux[klo][2] = aquiTermina;
                                transAux[klo][1] = exp;
                            } else {
                                if (transAux[klo][0] == aquiParte && transAux[klo][2] == aquiTermina) {
                                    transAux[klo][1] = exp;
                                } else {
                                    if (transAux[klo][0] == esteFuera) {
                                        transAux.splice(klo, 1);
                                        klo = 0;
                                    } else {
                                        if (transAux[klo][2] == esteFuera) {
                                            transAux.splice(klo, 1);
                                            klo = 0;
                                        }
                                    }
                                }
                            }
                        }
                        transAux = siSonIguales(transAux, alfaCompleto);
                        estadoAux.splice(hjo, 1);
                        alfaCompleto.push(exp);
                        matrizDestinos = MatrizDest(transAux, estadoAux, alfaCompleto);
                        contEst = 0;
                    }

                } else {
                    var otro = "k";
                    for (var wvm = 0; wvm < alfaCompleto.length; wvm++) {
                        if (matrizDestinos[contEst][wvm] == esteFuera) {
                            otro = otro + alfaCompleto[wvm];
                        }
                    }
                    var otro2 = otro.slice(1, otro.length);
                    if (hayBucle2 == 1) {
                        var algo3 = "k";
                        for (var tyo = 0; tyo < alfaCompleto.length; tyo++) {
                            if (matrizDestinos[hjo][tyo] == esteFuera) {
                                algo3 = algo3 + "+" + alfaCompleto[tyo];
                            }
                        }
                        var algo4 = algo3.slice(2, algo3.length);
                        algo4 = "(" + algo4 + ")*";
                        var otro3 = "k";
                        for (var wvm = 0; wvm < alfaCompleto.length; wvm++) {
                            if (matrizDestinos[hjo][wvm] == aquiTermina) {
                                otro3 = otro3 + alfaCompleto[wvm];
                            }
                        }
                        var otro4 = otro3.slice(1, otro3.length);
                        var exp = "(" + otro2 + ")(" + algo4 + otro4 + ")";
                        for (var klo = 0; klo < transAux.length; klo++) {
                            if (transAux[klo][2] == esteFuera && transAux[klo][0] == aquiParte) {
                                transAux[klo][2] = aquiTermina;
                                transAux[klo][1] = exp;
                            } else {
                                if (transAux[klo][0] == aquiParte && transAux[klo][2] == aquiTermina) {
                                    transAux[klo][1] = exp;
                                } else {
                                    if (transAux[klo][0] == esteFuera) {
                                        transAux.splice(klo, 1);
                                        klo = 0;
                                    } else {
                                        if (transAux[klo][2] == esteFuera) {
                                            transAux.splice(klo, 1);
                                            klo = 0;
                                        }
                                    }
                                }
                            }
                        }
                        transAux = siSonIguales(transAux, alfaCompleto);
                        estadoAux.splice(hjo, 1);
                        alfaCompleto.push(exp);
                        matrizDestinos = MatrizDest(transAux, estadoAux, alfaCompleto);
                        contEst = 0;
                    } else {
                        var otro3 = "k";
                        for (var wvm = 0; wvm < alfaCompleto.length; wvm++) {
                            if (matrizDestinos[hjo][wvm] == aquiTermina) {
                                otro3 = otro3 + alfaCompleto[wvm];
                            }
                        }
                        var otro4 = otro3.slice(1, otro3.length);
                        var exp = "(" + otro2 + ")(" + otro4 + ")";
                        for (var klo = 0; klo < transAux.length; klo++) {
                            if (transAux[klo][2] == esteFuera && transAux[klo][0] == aquiParte) {
                                transAux[klo][2] = aquiTermina;
                                transAux[klo][1] = exp;
                            } else {
                                if (transAux[klo][0] == aquiParte && transAux[klo][2] == aquiTermina) {
                                    transAux[klo][1] = exp;
                                } else {
                                    if (transAux[klo][0] == esteFuera) {
                                        transAux.splice(klo, 1);
                                        klo = 0;
                                    } else {
                                        if (transAux[klo][2] == esteFuera) {
                                            transAux.splice(klo, 1);
                                            klo = 0;
                                        }
                                    }
                                }
                            }
                        }
                        transAux = siSonIguales(transAux, alfaCompleto);
                        estadoAux.splice(hjo, 1);
                        alfaCompleto.push(exp);
                        matrizDestinos = MatrizDest(transAux, estadoAux, alfaCompleto);
                        contEst = 0;
                    }

                }
            } else {
                contEst++;
            }
            if (aquiParte == "I" && aquiTermina == "F") {
                contEst = 9999;
            }
        } else {
            contEst++;
        }
    } while (contEst < estadoAux.length);

    var Expresion = transAux[0][1];
    console.log("La expresión con transiciones vacias es:" + Expresion);
    var ArregloN = Array.from(Expresion), tñ = 0;
    do {
        if (ArregloN[tñ] == "(" && ArregloN[tñ + 1] == "E" && ArregloN[tñ + 2] == ")") {
            ArregloN.splice(tñ, 3);
            tñ = 0;
        } else {
            if (ArregloN[tñ]=="E") {
                ArregloN.splice(tñ, 1);
                tñ = 0;
            }
            else {
                tñ++;
            }
        }
    } while (tñ < ArregloN.length);
    console.log(ArregloN)
    var alg = "k";
    for (var kc = 0; kc < ArregloN.length; kc++) {
        alg = alg + ArregloN[kc];
    }
    var algoF = alg.slice(1, alg.length);
    console.log("La expresión final sin transiciones vacias es: " + algoF);

    // Imprime en pagina el resultado
    var ERHTML= document.getElementById('ER-AFD');
    ERHTML.innerHTML= 'La expresión regular obtenida para el AFD ingresado es: <br>'+algoF;
}

AFDtoER(estado, transicion, alfabeto)
