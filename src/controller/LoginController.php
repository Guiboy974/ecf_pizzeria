<?php
namespace App\controller;

use App\controller\ControllerInterface;
use App\model\DaoController;

class LoginController implements ControllerInterface {
    private $users;

    public function __construct() {
        // $this->users = new UserController();
    }

    public function doGet() {
        require_once 'template/login.php';
    }
    
    /**
     * récupère les données du formulaire de connexion
     * et les envoie à la méthode login du UserController
     * @return void
     */
    public function doPost() { 
        $username = $_POST['username'];
        $password = $_POST['password'];
        
        $user = new DaoController();
        $user->login($username, $password);

        if ($user) {
            session_start();
            $_SESSION['user'] = $username;
            require 'template/home.php';
            
        } else {
            header('Location: index.php?action=login');
        }
    }

}