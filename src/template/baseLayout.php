<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
        crossorigin="anonymous"></script>

    <script type="module" src="./assets/app.js"></script>

    <meta name="description"
        content="Pizzeria Casa di Jo, secteur Metz Woippy, pizza aux feux de bois, pizza traditionnel, pizza base tomate, pizza base crème">
    <title>Casa Di Jo Pizzeria</title>
</head>

<!-- modele de base ou s'implémente les différentes vue -->
<body class="bg-dark text-white mx-auto">
    <?php include 'header.php'; ?>

    <main class="container text-center">
        <?php 
        if (isset($content)) {
            echo $content;
        } else {
            echo "Content not found.";
        }
        ?>
    </main>
    
    <?php include 'footer.php'; ?>

</body>

</html>