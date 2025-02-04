<?php

namespace App\model;

use PDO;
use PDOException;
use App\model\DaoInterface;
use App\ConnectBDD;
use App\model\UserEntity;

//FIXME changer le nom de la table par users
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

            // Check if email already exists
            $checkQuery = $db->prepare("SELECT COUNT(*) FROM client WHERE email_client = :email");
            $checkQuery->execute([':email' => $user->getEmail()]);
            $emailExists = $checkQuery->fetchColumn();

            if ($emailExists) {
                throw new \Exception("User email already exists.");
            } else {
                // insert nouvelle utilisateur
                //TODO re check enregistrement
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
                $id = $db->lastInsertId();
                $user->setId($id);
            }
            exit();

        } catch (PDOException $exc) {
            exit($exc->getMessage());
        }
    }


    public function readOne(int $id): EntityInterface
    {

    }

    public function readAll(): array
    {
        try {
            $db = ConnectBDD::getInstance();
            $stmt = $db->query("SELECT * from utilisateurs");
            return $stmt->fetchAll();
        } catch (PDOException $exc) {
            exit($exc->getMessage());
        }
    }

    public function update(EntityInterface $entity): bool
    {
        //TODO Ajouter le code pour mettre à jour un utilisateur
        return true; // or return false based on your logic
    }

    public function delete(EntityInterface $entity): bool
    {
        try {
            $db = ConnectBDD::getInstance();
            //TODO a verifié si besoin bindValue ou pas...
            $stmt = $db->prepare("DELETE from Membres WHERE id_membre = :id");
            $stmt->execute();
            return true;
        } catch (PDOException $exc) {
            exit($exc->getMessage());
        }
    }

    /**
     * fait la connexion de l'utilisateur à la base de données
     * @param mixed $username
     * @param mixed $password
     * @return void
     */
    public function login($mail, $password)
    {
        try {
            $db = ConnectBDD::getInstance();
            $query = $db->prepare("SELECT * FROM client WHERE email_client = :email");
            $query->bindParam(':email', $mail);
            $query->execute();
            $user = $query->fetch(PDO::FETCH_ASSOC);

            if ($user && password_verify($password, $user['password'])) {
                $entity = new UserEntity();
                $entity->setName($user['nom_client']);
                $entity->setPrenom($user['prenom_client']);
                $entity->setAdresse($user['adresse_client']);
                $entity->setTelephone($user['telephone_client']);
                $entity->setEmail($user['email_client']);
                $entity->setPassword($user['mot_de_passe_client']);
                $entity->setId($user['id_client']);

                session_start();
                $_SESSION['user'] = $entity;
            }
            

        } catch (PDOException $exc) {
            exit($exc->getMessage());
        }
    }

    public function readAllPizzas(): array
    {
        try {
            //TODO finir ajout image
            $db = ConnectBDD::getInstance();
            $stmt = $db->query("SELECT pizza.nom_pizza, pizza.prix_pizza, base.nom_base, GROUP_CONCAT(ingredient.nom_ingredient SEPARATOR ', ') as ingredients 
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
    
}

// JOIN image ON image.id_pizza = pizza.id_pizza 
