<?php
header("Content-type: application/json");
include 'LogModel/LOG.php';

$formulario = json_decode(file_get_contents('php://input'), true);
$directorio = 'LOGS';
$path = 'LOGS/Informativo.log';
$alfabeto = 'alfabeto';

if($formulario[$alfabeto]){
    if($formulario['afd']){
        if(!is_dir($directorio)){ // Comprueba si existe el directorio de logs, si no, lo crea
            mkdir($directorio);
        }

        $log = new Log($path);
        $message = array(
            'Datos del automata( ',
            'El alfabeto: ', $formulario[$alfabeto],
            ' El estado Inicial: ', $formulario['EstadoInicial'],
            ' El estado final: ', $formulario['EstadoFinal'],
            ' AFD: ', $formulario['afd'],
            ')'
        );
        $log->writeline('Info', implode($message));
        $log->close();
    }else{
        if(!is_dir($directorio)){
            mkdir($directorio);
        }
        $log = new Log($path);
        $message = array(
            'Datos del automata( ',
            'El alfabeto: ', $formulario['alfabeto'],
            ' El estado Inicial: ', $formulario['EstadoInicial'],
            ' El estado final: ', $formulario['EstadoFinal'],
            ' AFND: ', $formulario['afnd'],
            ')'
        );
        $log->writeline('Info', implode($message));
        $log->close();
    }
}else{
    $log = new Log($path);
    $message = array(
        'Transiciones del Automata(',
        'El estado base: ', $formulario['EstadoBase'],
        ' El simbolo: ', $formulario['Simbolo'],
        ' El estado final: ', $formulario['EstadoLlegada'],
    );
    $log->writeline('Info', implode($message));
}

?>