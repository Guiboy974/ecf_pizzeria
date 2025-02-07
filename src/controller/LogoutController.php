<?php

namespace App\controller;

use App\controller\ControllerInterface;

class LogoutController implements ControllerInterface {

    
        public function __construct(){}
        
        /**
         * Summary of doPost
         * gère la déconnexion
         * @return void
         */
        public function doPost(){
            if (session_status() == PHP_SESSION_NONE) {
                session_start();
            }
            $_SESSION = array();
            if (ini_get("session.use_cookies")) {
                $params = session_get_cookie_params();
                setcookie(session_name(), '', time() - 42000,
                    $params["path"], $params["domain"],
                    $params["secure"], $params["httponly"]
                );
            }
            session_destroy();
            echo '<h2>Vous êtes déconnecté</h2>';
            header('refresh:1;url=index.php');
        }

        public function doGet(){
           
        }  
    }
