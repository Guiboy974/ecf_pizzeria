<header>
    <picture><img class="img-fluid mx-auto d-block" src="./images/emotionheader.jpg"
            alt="logo casa di jo, pizza aux feux de bois">
    </picture>
    <nav class="navbar navbar-expand-lg bg-success-subtle d-flex justify-content-center fw-medium">
        <div class="me-auto">
            <button class="navbar-toggler m-1" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavDropdown">
                <ul class="navbar-nav ms-3">
                    <li class="nav-item m-1">
                        <a class="nav-link text-dark" href="index.php">Accueil</a>
                    </li>
                    <li class="nav-item m-1">
                        <a class="nav-link text-dark" aria-current="page" href="index.php?action=pizzas">Nos Pizzas</a>
                    </li>
                    <li class="nav-item m-1">
                        <a class="nav-link text-dark" href="#">Nous contacter</a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="me-3">
            <a class="link-dark text-decoration-none m-2"> 
            <!-- href="index.php?action=commande" -->
                <i class="bi bi-cart4 p-1 position-relative" id="commande">
                    <span
                        class="position-absolute top-0 start-100 translate-middle p-1 bg-danger text-white border border-light rounded-circle nb-pizza"></span>
                </i>
            </a>
            <a class="link-dark text-decoration-none" href="index.php?action=login">
                
                <i class="bi bi-person-circle p-1"></i>
            </a>
        </div>
    </nav>
</header>