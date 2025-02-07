<?php

ob_start(); ?>

<!-- affiche validation de commande -->

<section class="card w-75 mx-auto border-success">
    <div class="card-body text-success">
        <h4 class="card-title">Commande en cours de préparation</h4>
        <p class="card-text">Votre commande a été validé.<br> Merci d'avoir commandé chez Casa Di Jo.</p>
    </div>
</section>


<?php
$content = ob_get_clean();
include 'template/baseLayout.php';
?>