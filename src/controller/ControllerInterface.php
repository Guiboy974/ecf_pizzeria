<?php

namespace App\controller;

interface ControllerInterface
{
    public function __construct();
    public function doPost();
    public function doGet();

}