<?php

namespace App\model;

use PDO;
use PDOException;
use App\model\DaoInterface;
use App\ConnectBDD;
use App\model\UserEntity;

class DaoController implements DaoInterface
{

    /**
     * crée un nouvel utilisateur
     * @param \App\model\EntityInterface $entity
     * @return bool
     */
    public function create(EntityInterface $entity)
    {
        /**  @var UserEntity */
        $user = $entity;
        try {
            $db = ConnectBDD::getInstance();

            // insert nouvelle utilisateur
            $query = $db->prepare("INSERT INTO client (nom_client, prenom_client, adresse_client, telephone_client, email_client, mot_de_passe_client) VALUES (:nom, :prenom, :adresse, :telephone, :email, :password)");
            $query->execute(
                [
                    ':nom' => $user->getName(),
                    ':prenom' => $user->getPrenom(),
                    ':adresse' => $user->getAdresse(),
                    ':telephone' => $user->getTelephone(),
                    ':email' => $user->getEmail(),
                    ':password' => $user->getPassword()
                ]
            );
            // $id = $db->lastInsertId();
            // $user->setId($id);
            return true;

        } catch (PDOException $exc) {
            exit($exc->getMessage());
        }
    }

    /**
     * lit dans la bdd pour un seul client
     * @param mixed $email
     * @return void
     */
    public function readOne($email)
    {
        $db = ConnectBDD::getInstance();
        try {
            $checkQuery = $db->prepare("SELECT * FROM client WHERE email_client = :email");
            $checkQuery->bindParam(':email', $email);
            $checkQuery->execute();
            $checkQuery->fetch();

        } catch (PDOException $exc) {
            exit($exc->getMessage());
        }
    }

    /**
     * non utiliser dans cette app
     * @return array
     */
    public function readAll(): array
    {
        try {
            $db = ConnectBDD::getInstance();
            $stmt = $db->query("SELECT * from client");
            return $stmt->fetchAll();
        } catch (PDOException $exc) {
            exit($exc->getMessage());
        }
    }

    /**
     * Summary of update
     * non utiliser dans cette app
     * @param \App\model\EntityInterface $entity
     * @return bool
     */
    public function update(EntityInterface $entity): bool
    {
        //TODO Ajouter le code pour mettre à jour un utilisateur
        return true; // or return false based on your logic
    }

    /**
     * Summary of delete
     * non utiliser dans cette app
     * @param \App\model\EntityInterface $entity
     * @return bool
     */
    public function delete(EntityInterface $entity): bool
    {
        try {
            $db = ConnectBDD::getInstance();
            //TODO a verifié si besoin bindValue ou pas...
            $stmt = $db->prepare("DELETE from client WHERE id_client = :id");
            $stmt->execute();
            return true;
        } catch (PDOException $exc) {
            exit($exc->getMessage());
        }
    }

    /**
     * fait la connexion de l'utilisateur à la base de données
     * @param mixed $email
     * @param mixed $password
     * @return 
     */
    public function login($email, $password)
    {
        try {
            $db = ConnectBDD::getInstance();
            $query = $db->prepare("SELECT * FROM client WHERE email_client = :email");
            $query->bindParam(':email', $email);
            $query->execute();
            $user = $query->fetch(PDO::FETCH_ASSOC);

            if ($user && password_verify($password, $user['mot_de_passe_client'])) {
                $entity = new UserEntity();
                $entity->setName($user['nom_client']);
                $entity->setPrenom($user['prenom_client']);
                $entity->setAdresse($user['adresse_client']);
                $entity->setTelephone($user['telephone_client']);
                $entity->setEmail($user['email_client']);
                $entity->setPassword($user['mot_de_passe_client']);
                $entity->setId($user['id_client']);

                $_SESSION['user'] = $entity;
                return $entity;
            }


        } catch (PDOException $exc) {
            exit($exc->getMessage());
        }
    }

    /**
     * lit les pizzas en bdd
     * @return array
     */
    public function readAllPizzas(): array
    {
        try {
            //TODO finir ajout image
            $db = ConnectBDD::getInstance();
            $stmt = $db->query("SELECT pizza.id_pizza, pizza.nom_pizza, pizza.prix_pizza, base.nom_base, GROUP_CONCAT(ingredient.nom_ingredient SEPARATOR ', ') as ingredients 
                    FROM pizza
                    JOIN base ON base.id_base = pizza.id_base
                    JOIN compose ON compose.id_pizza = pizza.id_pizza
                    JOIN ingredient ON ingredient.id_ingredient = compose.id_ingredient
                    GROUP BY pizza.nom_pizza, pizza.prix_pizza, base.nom_base");
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $exc) {
            exit($exc->getMessage());
        }
    }
    // JOIN image ON image.id_pizza = pizza.id_pizza 

    /**
     * ajoute une commande au dépot
     * @param mixed $data
     * @param mixed $list
     * @throws \Exception
     * @return void
     */
    public function createCommande($data, $list)
    {
        try {
            $db = ConnectBDD::getInstance();
            $db->beginTransaction();

            $date = date('Y-m-d H:i:s');

            //FIXME pb integrité, impossibilité d'entrer plusieur clé primaire identique (id_client, id_pizza), pourtant nécessaire un client peut commander plusieur pizza identique
            //TODO modifier donnée entrer ou bdd pour avec une id_commande? pour pouvoir faire les INSERT
            foreach ($list as $pizzas) {
                if (!isset($pizzas['id']) || !isset($data['id_client']) || !isset($data['quantite']) || !isset($data['recuperation'])) {
                    throw new \Exception("Données manquantes pour l'insertion dans la base de données.");
                }
                $stmt = $db->prepare("INSERT INTO commande (id_pizza, id_client, quantite_commande, date_commande, recuperation) VALUES (:id_pizza, :id_client, :quantite_commande, :date_commande, :recuperation)");
                $stmt->bindParam(':id_pizza', $pizzas['id']);
                $stmt->bindParam(':id_client', $data['id_client']);
                $stmt->bindParam(':quantite_commande', $data['quantite']);
                $stmt->bindParam(':date_commande', $date);
                $stmt->bindParam(':recuperation', $data['recuperation']);
                $stmt->execute();
            }

            $db->commit();

        } catch (PDOException $exc) {
            $db->rollBack();
            exit("Erreur lors la lecture de la BDD : " . $exc);
        }
    }

}

