<?php
namespace App\model;

use App\model\DaoController;

class PizzaModel
{

    private $pizzas;

    /**
     * Get the value of pizzas
     */
    public function getPizzas()
    {
        $this->pizzas = new DaoController;
        $pizzas = $this->pizzas->readAllPizzas();
        header('Content-Type: application/json');
        echo json_encode($pizzas);
    }
}