<?php

ob_start(); ?>
<?php session_start(); ?>

<section class="container-fluid mt-3 text-center" id="divCommande">
    
</section>

<?php
$content = ob_get_clean();
include 'template/baseLayout.php';
?>