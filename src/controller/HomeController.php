<?php

namespace App\controller;

use App\controller\ControllerInterface;

class HomeController implements ControllerInterface
{
  
    public function __construct()
    {
   
    }

    /**
     * Summary of doGet
     * @return void
     */
    public function doGet()
    {
        require_once 'template/home.php';
        
    }
    
    public function doPost()
    {
    }

}