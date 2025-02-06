<?php

namespace App\model;

interface DaoInterface
{
    public function create(EntityInterface $entity);
    
    public function readOne($email);
    
    public function readAll(): array;
    
    public function update(EntityInterface $entity): bool;

    public function delete(EntityInterface $entity): bool;
}