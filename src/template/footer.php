<footer class="mt-3 bottom-0">
    <div class="card text-center">
        <div class="card-header">
            <ul class="nav nav-tabs card-header-tabs">
                <li class="nav-item">
                    <a class="nav-link active" aria-current="true" href="index.html">Mon site</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" aria-current="true" href="secret.php">Secret ;)</a>
                </li>
            </ul>
        </div>
        <?php if (!isset($_SESSION['user'])): ?>
            <div class="card-body">
                <h5 class="card-title">Bah alors?</h5>
                <p class="card-text">Toujours pas inscrit?</p>
                <a href="register" class="btn btn-primary">S'enregister</a>
            </div>
        <?php endif ?>
        <?php if (isset($_SESSION['user'])): ?>
            <div class="card-body">
                <h5 class="card-title">Bah alors?</h5>
                <p class="card-text">Toujours la?</p>
                <button type="button" class="btn btn-dark"><a class="link-light link-underline-opacity-0" href="index.php?action=logout">Se déconnecter</a></button>

            </div>
        <?php endif ?>

    </div>
</footer>

</body>

</html>