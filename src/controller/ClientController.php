<?php

namespace App\controller;

class ClientController implements ControllerInterface
{
    public function __construct(){}

    public function doGet()
    {
        if (session_status() == PHP_SESSION_NONE) {
            session_start();
        }
        if (isset($_SESSION['user'])) {
            $user = $_SESSION['user'];
            header('Content-Type: application/json');
            echo json_encode([
                'name' => $user->getName(),
                'prenom' => $user->getPrenom(),
                'adresse' => $user->getAdresse(),
                'telephone' => $user->getTelephone(),
                'email' => $user->getEmail(),
                'id' => $user->getId()
            ]);
        } else {
            require_once 'template/login.php';
        }
    }

    public function doPost()
    {
        // Handle POST requests if needed
    }
}