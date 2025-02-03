<?php
namespace App\controller;

use App\controller\ControllerInterface;

class LogoutController implements ControllerInterface {

    
        public function __construct(){}

        public function doPost(){}

        /**
         * Déconnecte l'utilisateur
         * @return void
         */
        public function doGet(){
            session_start();
            session_destroy();
            echo '<h2>Vous êtes déconnecté</h2>';
            header('refresh:1;url=index.php');
        }  
    }
