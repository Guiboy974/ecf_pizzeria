<?php
namespace App\controller;

use App\controller\ControllerInterface;
use App\model\DaoController;
use App\model\UserEntity;

class LoginController implements ControllerInterface {
    private $users;

    public function __construct() {
        // $this->users = new UserController();
    }

    public function doGet() {
        session_start();
        require_once 'template/login.php';
    }
    
    /**
     * récupère les données du formulaire de connexion
     * et les envoie à la méthode login du UserController
     * @return void
     */
    public function doPost() { 

        //FIXME correction et controle login
        $email = $_POST['email'];
        $password = $_POST['password'];
    
        $daoController = new DaoController();
        $userEntity = $daoController->login($email, $password);
    
        if ($userEntity) {
            session_start();
            $_SESSION['username'] = $_SESSION['user']->getPrenom();
            require 'template/home.php';
        } else {
            echo 'nok';
            // header('Location: index.php?action=login');
        }
    }

}