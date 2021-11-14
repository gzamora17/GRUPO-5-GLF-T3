<?php
header("Content-type: application/json"); // enlaza php con json
include 'LogModel/LOG.php'; // Modelo de los Logs

$error = json_decode(file_get_contents('php://input'), true); // Permite recibir datos enviados desde js hacia php

if(!is_dir('LOGS')){
    mkdir('LOGS');
}

$log = new Log('LOGS/Error.log');
$message = array( $error['Error']);
$log->writeline('Error', implode($message));
$log->close()
?>