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
        header('Content-Type: application/json');

        $request_json = file_get_contents('php://input', true);
        $data = json_decode($request_json, true);

        // Ensure $data is an array
        if (!is_array($data)) {
            echo json_encode(['status' => 'error', 'message' => 'Invalid data format']);
            return;
        }

        $commandeList = $data['commande'];
        
        $dao = new DaoController;
        try {
            $dao->createCommande($data, $commandeList);
            echo json_encode(['status' => 'success', 'message' => 'Commande créée avec succès']);
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