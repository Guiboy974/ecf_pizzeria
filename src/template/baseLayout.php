<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
    <script type="module" src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <title>Mon site</title>
</head>

<body>
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