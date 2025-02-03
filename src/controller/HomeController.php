<?php

namespace App\controller;

use App\controller\ControllerInterface;

class HomeController implements ControllerInterface
{
  
    public function __construct()
    {
   
    }

    public function doGet()
    {
        //TODO Ajouter le code pour afficher la page d'accueil
        require_once 'template/home.php';
        
    }
    
    public function doPost()
    {
        //TODO Ajouter le code pour traiter le formulaire de la page d'accueil
    }

}