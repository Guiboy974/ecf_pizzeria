<?php

namespace App;

require('../vendor/autoload.php');

$dotenv = \Dotenv\Dotenv::createImmutable("../");
$dotenv->load();

use App\controller\HomeController;
use App\controller\LoginController;
use App\controller\LogoutController;
use App\controller\RegisterController;


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
    case 'secret':
        break;
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