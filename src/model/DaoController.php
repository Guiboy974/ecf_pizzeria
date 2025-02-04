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
            $checkQuery = $db->prepare("SELECT COUNT(*) FROM users WHERE usermail = :email");
            $checkQuery->execute([':email' => $user->getEmail()]);
            $emailExists = $checkQuery->fetchColumn();

            if ($emailExists) {
                throw new \Exception("User email already exists.");
            }
            $query = $db->prepare("INSERT INTO users (username, password, usermail) VALUES (:username, :password, :email)");
            $query->execute([':username' => $user->getUsername(), ':password' => $user->getPassword(), ':email' => $user->getEmail()]);
            $id = $db->lastInsertId();
            $user->setId($id);
            return true;

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
    public function login($username, $password)
    {
        try {
            $db = ConnectBDD::getInstance();
            $query = $db->prepare("SELECT * FROM users WHERE username = :username");
            $query->bindParam(':username', $username);
            $query->execute();
            $user = $query->fetch(PDO::FETCH_ASSOC);

            if ($user && password_verify($password, $user['password'])) {
                $entity = new UserEntity();
                $entity->setUsername($user['username']);
            }

        } catch (PDOException $exc) {
            exit($exc->getMessage());
        }
    }

    public function readAllPizzas(): array
    {
        try {
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

