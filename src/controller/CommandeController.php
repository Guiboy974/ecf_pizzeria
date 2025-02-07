<?php

namespace App\controller;

use App\model\DaoController;

class CommandeController implements ControllerInterface
{
    public function __construct()
    {
    }

    /**
     * Summary of doPost
     * @return never
     */ 
    public function doPost()
    {
        header( 'Content-Type: application/json');
        $request_json = file_get_contents('php://input', true);
        $data = json_decode($request_json, true);
        
        if (!is_array($data)) {
            echo json_encode(['status' => 'error', 'message' => 'Invalid data format']);
            exit;
        }
        
        $requiredKeys = ['commande', 'client', 'telephone', 'id_client', 'recuperation'];
        foreach ($requiredKeys as $key) {
            if (!isset($data[$key])) {
                echo json_encode(['status' => 'error', 'message' => "Clé(s) manquante(s): $key"]);
                exit;
            }
        }
        
        if (!is_array($data['commande'])) {
            echo json_encode(['status' => 'error', 'message' => "'commande' doit être une tableau"]);
            exit;
        }
        
        $commandeList = $data['commande'];
        
        $dao = new DaoController();
        try {
            $dao->createCommande($data, $commandeList);
            // include "template/commandeValider.php";
            exit;
        } catch (\PDOException $e) {
            // Capture les exceptions PDO et renvoie une réponse JSON
            echo json_encode(['status' => 'error', 'message' => 'Database error: ' . $e->getMessage()]);
            exit;
        } catch (\Exception $e) {
            echo json_encode(['status' => 'error', 'message' => 'Erreur lors de la création de la commande: ' . $e->getMessage()]);
            exit;
        }

    }

    /**
     * Summary of doGet
     * @return void
     */
    public function doGet()
    {
        require_once "template/commande.php";
    }

}