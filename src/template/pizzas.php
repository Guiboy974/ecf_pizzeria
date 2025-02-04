<?php

ob_start(); ?>

<section class="container-fluid mt-3 text-center" id="main">
    <div class="m-2">
        <h1>Nos pizzas</h1>
        <select class="form-select form-select-sm w-50 mt-3 mx-auto" id="select-filtre">
            <option selected>-- toutes les pizzas --</option>
            <option value="1">- base tomate -</option>
            <option value="2">- base crême -</option>
        </select>
    </div>
    <article>
        <ul class="list-group list-group-flush mt-3 rounded d-md-block" id="list-pizza">
        </ul>
    </article>
</section>

<?php
$content = ob_get_clean();
include 'template/baseLayout.php';
?>