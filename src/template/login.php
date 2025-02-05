<?php

ob_start(); 
?>
<section class="container-fluid mt-3 text-center" id="main">

    <?php if (isset($_SESSION['user'])) : ?>
       
        <?php $user = $_SESSION['user']; ?>
        <h2 class="m-2">Bienvenue, <?php echo htmlspecialchars($user->getPrenom()); ?>!</h2>
        <p>Nom: <?php echo htmlspecialchars($user->getName()); ?></p>
        <p>Adresse: <?php echo htmlspecialchars($user->getAdresse()); ?></p>
        <p>Téléphone: <?php echo htmlspecialchars($user->getTelephone()); ?></p>
        <p>Email: <?php echo htmlspecialchars($user->getEmail()); ?></p>
    
        <form action="index.php?action=logout">
    
            <button class="btn btn-success" type="submit">se déconnecter</button>
        </form>
       
    <?php endif ?>
    
    <?php if (!isset($_SESSION['user'])) : ?>
        <h2 class="m-2">Se connecter</h2>
        <form action="index.php?action=login" method="post" class="text-center">
            <input class="form-control m-1" type="text" name="email" placeholder="Votre email">
            <input class="form-control m-1" type="password" name="password" placeholder="Mot de passe">
            <button class="m-1 btn btn-success col-4 " type="submit" value="login">se connecter</button>
        </form>
        
        <div class="m-3">
            <p>pas de compte?</p>
            <form action="index.php?action=register" method="get">
                <input type="hidden" name="action" value="register">
                <button class="btn btn-outline-success col-4">s'enregistrer</button>
            </form>
        </div>
    <?php endif ?>
</section>

<?php
$content = ob_get_clean();
include 'template/baseLayout.php';
?>