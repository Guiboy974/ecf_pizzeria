<?php
namespace App\controller;

use App\controller\ControllerInterface;

use App\model\DaoController;

class LoginController implements ControllerInterface {
    private $email;

    private $password;

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

        //FIXME correction et controle login
        $this->email = $_POST['email'];
        $this->password = $_POST['password'];
    
        $daoController = new DaoController();
        $userEntity = $daoController->login($this->email, $this->password);
    
        if ($userEntity) {
            
            require 'template/home.php';
        } else {
            echo 'nok';
            // header('Location: index.php?action=login');
        }
    }

}