<?php

ob_start(); ?>

<section class="container-fluid mt-3 text-center" id="main">
    <h1 class="m-3">Bienvenue A la Casa Di Jo!</h1>
    
    <?php if (isset($_SESSION['username'])) : ?>
        <p>Bonjour <?= $_SESSION['username']?></p>
        <form action="index.php?action=logout">
    
            <button class="btn btn-success" type="submit">se déconnecter</button>
        </form>
    <?php endif ?>
    
    <?php if (!isset($_SESSION['username'])) : ?>
        <form action="index.php" method="get">
            <input type="hidden" name="action" value="login">
            <button class="btn btn-success m-1">se connecter</button>
        </form>
        <form action="index.php" method="get">
            <input type="hidden" name="action" value="register">
            <button class="btn btn-success m-1">s'enregistrer</button>
        </form>
    <?php endif ?>
</section>

<?php
$content = ob_get_clean();
include 'template/baseLayout.php';
?>