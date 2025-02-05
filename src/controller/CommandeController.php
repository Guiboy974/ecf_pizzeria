<?php

namespace App\controller;

class CommandeController implements ControllerInterface
{
    public function __construct(){}
    public function doPost(){}
    public function doGet(){
        require_once "template/commande.php";
    }

}