<?php

namespace App\controller;

use App\model\DaoController;

class CommandeController implements ControllerInterface
{
    public function __construct()
    {
    }
    public function doPost()
    {
        $request_json = file_get_contents('php://input', true);
        $data = json_decode($request_json, true);
        
        if (!is_array($data)) {
            echo json_encode(['status' => 'error', 'message' => 'Invalid data format']);
            return;
        }
        
        $requiredKeys = ['commande', 'client', 'telephone', 'id_client', 'quantite', 'recuperation'];
        foreach ($requiredKeys as $key) {
            if (!isset($data[$key])) {
                echo json_encode(['status' => 'error', 'message' => "Missing required key: $key"]);
                return;
            }
        }
        
        if (!is_array($data['commande'])) {
            echo json_encode(['status' => 'error', 'message' => "'commande' must be an array"]);
            return;
        }
        
        $commandeList = $data['commande'];
        
        $dao = new DaoController();
        try {
            $dao->createCommande($data, $commandeList);
            echo json_encode(['status' => 'success', 'message' => 'Commande créée avec succès']);
        } catch (\PDOException $e) {
            // Capture les exceptions PDO et renvoie une réponse JSON
            echo json_encode(['status' => 'error', 'message' => 'Database error: ' . $e->getMessage()]);
        } catch (\Exception $e) {
            echo json_encode(['status' => 'error', 'message' => 'Erreur lors de la création de la commande: ' . $e->getMessage()]);
        }

        // if ($done) {
        //     echo 'ok' ;
        // }
        

    }
    public function doGet()
    {
        require_once "template/commande.php";
    }

}