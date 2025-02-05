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

        $username = $_POST['nom'];
        $prenom = $_POST['prenom'];
        $adresse = $_POST['adresse'];
        $telephone = $_POST['telephone'];
        $email = $_POST['email'];
        $password = $_POST['password'];

        $user = new UserEntity();
        $user->setName($username);
        $user->setPrenom($prenom);
        $user->setAdresse($adresse);
        $user->setTelephone($telephone);
        $user->setEmail($email);
        $user->setPassword($password);

        $createUser = new DaoController();
        $createUser->create($user);

        if ($createUser->create($user)) {
            session_start();
            $_SESSION['prenom'] = $prenom;
            require 'template/home.php';
        } else {
            echo '<p>Echec de l\'inscription, veuillez rééssayer.</p>';
        }
    }
}