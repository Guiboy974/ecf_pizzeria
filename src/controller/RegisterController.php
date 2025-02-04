<?php
namespace App\controller;

use App\controller\ControllerInterface;
use App\model\DaoController;
use App\model\UserEntity;

class RegisterController implements ControllerInterface
{

    public function __construct()
    {
    }

    /**
     * affiche le formulaire d'inscription
     * @return void
     */
    public function doGet()
    {

        require_once 'template/register.php';
    }

    /**
     * methode doPost du controller pour creer un nouvel utilisateur
     * @return void
     */
    public function doPost()
    {

        $username = $_POST['username'];
        $password = $_POST['password'];
        $email = $_POST['email'];

        $user = new UserEntity();
        $user->setUsername($username);
        $user->setPassword($password);
        $user->setEmail($email);

        $createUser = new DaoController();
        $createUser->create($user);

        if ($createUser->create($user)) {
            session_start();
            $_SESSION['user'] = $username;
            require 'template/home.php';
        } else {
            echo '<p>Echec de l\'inscription, veuillez rééssayer.</p>';
        }
    }
}