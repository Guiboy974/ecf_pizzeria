<?php

namespace App\model;

interface DaoInterface
{
    public function create(EntityInterface $entity);
    
    public function readOne(int $id): EntityInterface;
    
    public function readAll(): array;
    
    public function update(EntityInterface $entity): bool;

    public function delete(EntityInterface $entity): bool;
}