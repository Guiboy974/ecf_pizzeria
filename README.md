# Ecf_pizzeria

"thème" et logo repris de la pizzeria Casa Di Jo à Metz

## lien github
https://github.com/Guiboy974/ecf_pizzeria

## langages utilisés
* HTML
* BOOTSTRAP
* JAVASCRIPT
* PHP
* SQL

## Configuration de l'environnement

necessite xampp ou autre logiciel similaire pour avoir un serveur en local pour faire du php, nécessite également d'installer Composer.

- ouvrir l'IDE de son choix

- cloner le dépot dans : xampp/htdocs

- pensez a lancer le serveur et la base de données

- ouvir le terminal dans l'ide 

```bash
cd dossier_de_travail
```

- installer ensuite phpdotenv, dans le terminal entrer la commande : 

```bash
composer require vlucas/phpdotenv
```

```bash
composer init
```

- Créez un fichier `.env` à la racine du projet et ajoutez les variables d'environnement comme l'exemple suivant :

```plaintext
BASE="nom_BDD" 
SERVER="localhost:3306"
USER="nom_utilisateur"
PASSWD="mot_de_passe"
```

- vérifier composer.json
```json
{
    "require": {
        "vlucas/phpdotenv": "^5.6"
    },
    "autoload": {
        "psr-4": {
            "App\\": "src/"
        }
    }
}
```

## structure dossier

```plaintext
- 📁 **ECF**
  - 📁 **src**
    - 📁 **assets**
      - 📁 **js**
        - app.js
        - envoyerCommande.js
        - form.js
        - recupererPizza.js
    - 📁 **controller**
      - ClientController.php
      - CommandeController.php
      - ControllerInterface.php
      - HomeController.php
      - LoginController.php
      - LogoutController.php
      - PizzaController.php
      - RegisterController.php
    - 📁 **images**
      - 📁 **screenshots**
        - casadijo-commande-form.png
        - casadijo-cuisine.png
        - casadijo-mobile-commande-form.png
        - casadijo-mobile-form.png
        - casadijo-mobile.png
        - casadijo.png
        - 4fromages.jpg
        - carbonara.jpg
        - dijo.jpg
        - emotionheader.jpg
        - margherita.jpg
        - montagnard.jpg
        - reine.jpg
      - 📁 **maquettes**
    - 📁 **model**
      - DaoController.php
      - DaoInterface.php
      - EntityInterface.php
      - PizzaModel.php
      - UserEntity.php
    - 📁 **template** (qui représente les différente vue de l'app)
      - baseLayout.php
      - commandeValider.php
      - footer.php
      - header.php
      - home.php
      - login.php
      - pizzas.php
      - register.php
    - ConnectBDD.php
    - index.php
    - autoload.php
  - 📁 **vendor**
    - 📁 **composer**
    - 📁 **graham-campbell**
    - 📁 **phpoption**
    - 📁 **symfony**
    - 📁 **vlucas**
  - .gitignore
  - composer.json
  - composer.lock
  - README.md
  - testCommande.json
```

## si on peut appeler ça de la doc... (ecf front-end)

- partie client : 

recuperePizza.js recupère les pizzas avec une fonction asynchrone qui est exporté vers app.js

app.js arrivé des différents imports, gère affichage des pizzas avec des classes bootstrap, modification de la commande et les différents évènements

form.js gère affichage et contrôle du formulaire de livraison/à emporté toujour avec bootstrap pour l'affichage et côté js avec différente regex pour contrôler les inputs, export des fonctions affichage vers app.js

- parti cuisine : 

Un unique .js qui gère la récupération des commande avec une fontion asynchrone, affiche les différentes commandes en fonctions des clients et modifie leur état au click :

commende a cour => commande prête => terminer

- difficulté : 

Pour commencer coté responsive, comme je voulais utilisé uniquement bootstrap et que mes images ne faisait pas toute la meme taille, compliqué d'avoir toute les li a la meme taille sans déformé les images, du coup je les ai générai avec ia pour palier au "problème".

Ensuite niveau nomage des variables et fonctions, pas évident, j'ai fais pas mal de frenglish.

Pas mal d'inatation de ma part, qui m'a fait perdre du temps.

J'ai des difficultés a trouvé comment filtrer les pizzas au final j'ai utilisé la méthode filter avec un switch pour ma condition.

Certaine fonctions peuvent parfois être un peu redondante dans la forme, mais je ne voyais comment faire autrement.

Première utilisation des RegEx et de la méthode test pour valider les inputs. Je n'ai encore totalement compris la syntaxe des regex, celle de l'adresse a d'ailleurs était générer par une ia.

Ia qui a d'ailleurs servi 2 ou 3 fois à débugger certaines petites erreurs.

Dans la parti cuisine j'ai du rajouté un id à la main aux clients pour pouvoir facilement passer la commande d'un status a un autre, id qu'il faudra de rajoute au code lors de la validation de commande.

## screenshots 

quelques screens de l'application web

appli mobile-first : 

<img src="./src/images/screenshots/casadijo-mobile.png" width="250px" height="auto">
<img src="./src/images/screenshots/casadijo-mobile-commande.png" width="200px" height="auto">
<img src="./src/images/screenshots/casadijo-mobile-form.png" width="200px" height="auto">

version pc:

<img src="./src/images/screenshots/casadijo.png" width="70%" height="auto">
<img src="./src/images/screenshots/casadijo-commande-form.png">

rendu coté cuisine (très très peu stylisé, pour le moment): 

<img src="./src/images/screenshots/casadijo-cuisine.png">




