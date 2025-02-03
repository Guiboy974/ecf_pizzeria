<?php
ob_start(); 
?>

<h2>Se connecter</h2>
<form action="index.php?action=login" method="post">
    <input type="text" name="username" placeholder="Nom d'utilisateur">
    <input type="password" name="password" placeholder="Mot de passe">
    <input type="submit" value="login">

</form>

<?php
$content = ob_get_clean();
include 'template/baseLayout.php';
?>