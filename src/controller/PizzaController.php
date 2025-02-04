<?php

namespace App\controller;

use App\controller\ControllerInterface;
use App\model\PizzaModel;


class PizzaController implements ControllerInterface
{

    private $dao;
    public function __construct()
    {

    }

    public function doGet()
    {
        //TODO Ajouter le code pour afficher la page d'accueil

        require_once 'template/pizzas.php';

    }

    public function doPost()
    {
        $this->dao = new PizzaModel();
        $this->dao->getPizzas();

    }


}

