<?php

ob_start(); ?>

<h1>Bienvenue A la Casa Di Jo!</h1>

<?php if (isset($_SESSION['user'])) : ?>
    <p>Bonjour <?= $_SESSION['user']?></p>
<?php endif ?>

<?php if (!isset($_SESSION['user'])) : ?>
    <form action="index.php" method="get">
        <input type="hidden" name="action" value="login">
        <button class="btn btn-outline-primary m-1">se connecter</button>
    </form>
    <form action="index.php" method="get">
        <input type="hidden" name="action" value="register">
        <button class="btn btn-outline-primary m-1">s'enregistrer</button>
    </form>
<?php endif ?>

<?php
$content = ob_get_clean();
include 'template/baseLayout.php';
?>