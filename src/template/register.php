<?php
ob_start(); 
?>

<h2>S'enregistrer</h2>
<div class="d-flex justify-content-center">
    <form class="col-5" action="index.php?action=register" method="post">
        <div class="mb-3">
            <label for="nom" class="form-label">Nom :</label>
            <input class="form-control" id="nom" type="text" name="nom" placeholder="Nom">
        </div>
        <div class="mb-3">
            <label for="prenom" class="form-label">Prénom :</label>
            <input class="form-control" id="prenom" type="text" name="prenom" placeholder="Prénom">
        </div>
        <div class="mb-3">
            <label for="adresse" class="form-label">Adresse :</label>
            <input class="form-control" id="adresse" type="text" name="adresse" placeholder="Votre adresse">
        </div>
        <div class="mb-3">
            <label for="telephone" class="form-label">Téléphone :</label>
            <input class="form-control" id="telephone" type="number" name="telephone" placeholder="0612345678">
        </div>
        <div class="mb-3">
            <label for="passwd" class="form-label">Mot de Passe : </label>
            <input class="form-control" type="password" name="password" id="passwd" placeholder="Votre mot de passe">
        </div>
        <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input class="form-control" type="email" name="email" id="email" placeholder="votre_mail@adc.fr">
        </div>
        <button type="submit" class="btn btn-success">S'enregistrer</button>
    </form>
</div>

<?php
$content = ob_get_clean();
include 'template/baseLayout.php';
?>