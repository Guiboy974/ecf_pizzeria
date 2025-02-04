<?php
namespace App\model;

use App\model\EntityInterface;
use App\model\DaoController;

 class UserEntity implements EntityInterface {
    private $id;
    private $username;
    private $password;
    private $email;

    private $pizzas;
    

     /**
     * Get the value of id
     */ 
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set the value of id
     *
     * @return  self
     */ 
    public function setId($id)
    {
        $this->id = $id;
        return $this;
    }

    /**
     * Get the value of username
     */ 
    public function getUsername()
    {
        return $this->username;
        
    }

    /**
     * Set the value of username
     *
     * @return  self
     */ 
    public function setUsername($username)
    {
        $this->username = $username;
        return $this;
    }

    /**
     * Get the value of password
     */ 
    public function getPassword()
    {
        return $this->password;
    }

    /**
     * Set the value of password
     *
     * @return  self
     */ 
    public function setPassword($password)
    {
        $this->password = password_hash($password, PASSWORD_DEFAULT);
        return $this;
    }

    /**
     * Get the value of email
     */ 
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * Set the value of email
     *
     * @return  self
     */ 
    public function setEmail($email)
    {
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            throw new \InvalidArgumentException("format de l'email invalide");
        }
        $this->email = $email;
        return $this;
    }



    /**
     * Get the value of pizzas
     */ 
    public function getPizzas()
    {
        $this->pizzas = new DaoController;
        return $this->pizzas->readAllPizzas();
    }
 }