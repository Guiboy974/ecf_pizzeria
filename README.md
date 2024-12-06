# Ecf_pizzeria

"thème" et logo repris de la pizzeria Casa Di Jo à Metz

## lien github
https://github.com/Guiboy974/ecf_pizzeria

## langages utilisés
* HTML
* BOOTSTRAP
* JAVASCRIPT

## structure dossier

- ECF

    * dossier cuisine_pizzeria (hmtl/js de la partie cuisine où arrive les commandes)

    * dossier images

    * dossier maquettes (les maquettes .pdf)

    * dossier pizzera (hmtl/js de la parti client)

    * tout les JSON des pizzas et le README

## si on peut appeler ça de la doc...

- partie client : 

recuperePizza.js recupère les pizzas avec une fonction asynchrone qui est exporté vers app.js

app.js arrivé des différents imports, gère affichage des pizzas avec des classes bootstrap, modification de la commande et les différents évènements

form.js gère affichage et contrôle du formulaire de livraison/à emporté toujour avec bootstrap pour l'affichage et côté js avec différente regex pour contrôler les inputs, export des fonctions affichage vers app.js

- parti cuisine : 

un unique .js qui gère la récupération des commande avec une fontion asynchrone, affiche les différentes commandes en fonctions des clients et modifie leur état au click :

commende a cour => commande prête => terminer

- difficulté : beaucoup...


## screenshots 

quelques screens de l'application web

appli mobile-first : 

<img src="./images/screenshots/casadijo-mobile.png" width="250px" height="auto">
<img src="./images/screenshots/casadijo-mobile-commande.png" width="200px" height="auto">
<img src="./images/screenshots/casadijo-mobile-form.png" width="200px" height="auto">

version pc:

<img src="./images/screenshots/casadijo.png" width="70%" height="auto">
<img src="./images/screenshots/casadijo-commande-form.png">

rendu coté cuisine (très très peu stylisé, pour le moment): 

<img src="./images/screenshots/casadijo-cuisine.png">




