<?php

class LOG{
    /**Atributos**/
    private $filelog;

    /**Metodos**/
    function __construct($path){
        $this->filelog = fopen($path,"a");
    }

    function writeline($type, $message){
        date_default_timezone_set("America/Santiago");
        $date = new DateTime();
        fputs($this->filelog, "[".$type."] [".$date->format("d-m-y H:i:s ")."]:".$message ."\n");
    }

    function close(){
        fclose($this->filelog);
    }
}

?>