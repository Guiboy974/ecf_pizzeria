<?php

namespace App\controller;

class ClientController implements ControllerInterface
{
    public function __construct(){}

    /**
     * Gère les requêtes GET pour le server.
     */
    public function doGet()
    {
        // Vérifie si la session n'est pas encore démarrée
        if (session_status() == PHP_SESSION_NONE) {
            session_start();
        }
        // Vérifie si l'utilisateur est connecté
        if (isset($_SESSION['user'])) {
            $user = $_SESSION['user'];
            // Définit le type de contenu de la réponse en JSON
            header('Content-Type: application/json');
            // Renvoie les informations de l'utilisateur en format JSON
            echo json_encode([
                'name' => $user->getName(),
                'prenom' => $user->getPrenom(),
                'adresse' => $user->getAdresse(),
                'telephone' => $user->getTelephone(),
                'email' => $user->getEmail(),
                'id' => $user->getId()
            ]);
        } else {
            // Si l'utilisateur n'est pas connecté, affiche la page de connexion
            require_once 'template/login.php';
        }
    }

    public function doPost()
    {
        // Gère les requêtes POST si nécessaire
    }
}