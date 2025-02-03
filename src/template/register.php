<?php
ob_start(); 
?>

<h2>S'enregistrer</h2>
<div class="d-flex justify-content-center">
    <form class="col-5" action="index.php?action=register" method="post">
        <div class="mb-3">
            <label for="name" class="form-label">Nom d'utilisateur :</label>
            <input class="form-control" id="name" type="text" name="username" placeholder="Nom d'utilisateur">
        </div>
        <div class="mb-3">
            <label for="passwd" class="form-label">Mot de Passe : </label>
            <input class="form-control" type="password" name="password" id="passwd" placeholder="Votre mot de passe">
        </div>
        <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input class="form-control" type="email" name="email" id="email" placeholder="Votre email">
        </div>
        <button type="submit" class="btn btn-primary">S'enregistrer</button>
    </form>
</div>

<?php
$content = ob_get_clean();
include 'template/baseLayout.php';
?>