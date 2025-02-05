<?php

namespace App;

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require('../vendor/autoload.php');

$dotenv = \Dotenv\Dotenv::createImmutable("../");
$dotenv->load();

use App\controller\HomeController;
use App\controller\LoginController;
use App\controller\LogoutController;
use App\controller\RegisterController;
use App\controller\PizzaController;
use App\controller\ClientController;
use App\controller\CommandeController;


$method = $_SERVER['REQUEST_METHOD'];
$action = isset($_GET['action']) ? $_GET['action'] : 'home';

switch ($action) {
    case 'home':
        $controller = new HomeController();
        break;
    case 'register':
        $controller = new RegisterController();
        break;
    case 'login':
        $controller = new LoginController();
        break;
    case 'logout':
        $controller = new LogoutController();
        break;
    case 'pizzas':
        $controller = new PizzaController();
        break;
    case 'client':
        $controller = new ClientController();
        break;
    case 'commande':
        $controller = new CommandeController();    
    default:
        # code...
        break;
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $controller->doPOST();
} else {
    $controller->doGET();
}
?>