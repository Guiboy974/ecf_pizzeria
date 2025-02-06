<?php

namespace App;

require('../vendor/autoload.php');

$dotenv = \Dotenv\Dotenv::createImmutable("../");
$dotenv->load();

if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

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
        break;  
    default:
           http_response_code(404);
           echo "Action non trouvée";
           exit;
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $controller->doPOST();
} else {
    $controller->doGET();
}
?>