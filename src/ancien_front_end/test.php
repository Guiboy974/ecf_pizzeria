<?php
// fetch_data.php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Connexion à la base de données
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "pizzeria";

// Créer une connexion
$conn = new mysqli($servername, $username, $password, $dbname);

// Vérifier la connexion
if ($conn->connect_error) {
    die("Connexion échouée: " . $conn->connect_error);
}

// Requête SQL pour récupérer les données
$sql = "SELECT * FROM pizzas";
$result = $conn->query($sql);

// Tableau pour stocker les résultats
$data = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
}

// Fermer la connexion
$conn->close();

// Retourner les données en format JSON
header('Content-Type: application/json');
echo json_encode($data);
?>