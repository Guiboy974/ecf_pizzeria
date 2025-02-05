"use strict"

// Initialisation des popovers
document.addEventListener('DOMContentLoaded', function () {
    function initPopovers() {
        const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
        [...popoverTriggerList].forEach(element => {
            new bootstrap.Popover(element, {
                trigger: 'manual'
            });
        });
    }

    // Rendre la fonction accessible globalement
    window.initPopovers = initPopovers;
    initPopovers();
});

import { recuperePizza } from "./recuperePizza.js";
import { afficheForm, controleForm, infoClient } from "./form.js"

const pizzas = await recuperePizza();
console.log(pizzas);


const ulPizza = document.getElementById("list-pizza");
const filtre = document.getElementById("select-filtre");
const commande = document.getElementById("commande");
export const containerPizza = document.getElementById("main");
export let commandePizza = [];
let nbPizza = document.getElementsByClassName("nb-pizza")[0];
if (nbPizza.textContent === "") {
    nbPizza.classList.add("d-none");
}

// Sauvegarde la commande dans le localStorage
function saveCommande() {
    localStorage.setItem('commandePizza', JSON.stringify(commandePizza));
}

// Charge la commande depuis le localStorage
function loadCommandeFromLocalStorage() {
    const savedCommande = localStorage.getItem('commandePizza');
    if (savedCommande) {
        commandePizza = JSON.parse(savedCommande);
        nbPizza.textContent = commandePizza.reduce((total, pizza) => total + pizza.nombre, 0);
        if (nbPizza.textContent > 0) {
            nbPizza.classList.remove("d-none");
        }
    }
}

// Charger la commande au démarrage
loadCommandeFromLocalStorage();
 
//affichage initiale des pizza
pizzas.forEach(pizzas => displayPizza(pizzas));

// filtre les pizzas
function filtrerPizza(event) {
    const optionValue = event.target.value;
    const pizzasFiltrees = pizzas.filter(pizzas => {
        switch (optionValue) {
            case "1":
                return pizzas.nom_base === "tomate";
            case "2":
                return pizzas.nom_base === "crême";
            default:
                return true; // affiche toutes les pizzas
        }
    });
    displayPizzas(pizzasFiltrees);
}

// affiche les pizzas
function displayPizzas(pizzas) {
    ulPizza.innerHTML = "";
    pizzas.forEach(pizza => displayPizza(pizza));
}

// creer li d'une pizza
function displayPizza(data) {
    const liPizza = document.createElement("li");
    const imgPizza = document.createElement("img");
    const divText = document.createElement("div");
    const divCount = document.createElement("div");
    const nomPizza = document.createElement("h4");
    const ingredients = document.createElement("p");
    const prix = document.createElement("p");
    const pCount = document.createElement("p");
    const btnAdd = document.createElement("button")

    liPizza.classList.add("list-group-item", "list-group-item-success", "p-2", "d-flex", "position-relative", "align-sm-items-center", "d-md-inline-block", "col-md-5", "rounded", "mx-md-2", "my-md-2");
    imgPizza.classList.add("p-1", "mt-2", "w-25", "h-25");
    imgPizza.setAttribute("src", data.img_pizza);
    imgPizza.setAttribute("alt", `pizza ${data.nom_pizza}`);
    divText.classList.add("mt-2", "mx-sm-2");
    divCount.classList.add("fs-5", "fw-semibold", "position-absolute", "top-0", "end-0");
    nomPizza.classList.add("m-0");
    nomPizza.textContent = data.nom_pizza;
    ingredients.classList.add("m-0", "fs-6", "text-wrap");
    ingredients.textContent = data.ingredients;
    prix.classList.add("mb-4", "mb-md-2", "fw-semibold");
    prix.textContent = `Prix : ${parseFloat(data.prix_pizza)} €`;
    pCount.innerHTML = '<p class="d-flex p-sm-2 m-1"><i class="bi bi-dash-circle mx-1"></i><span class="count">0</span><i class="bi bi-plus-circle mx-1"></i></p>';
    btnAdd.classList.add("btn", "btn-success", "m-1", "position-absolute", "bottom-0", "end-0");
    btnAdd.textContent = "Ajouter";

    // Ajout des attributs Bootstrap pour le popover
    btnAdd.setAttribute("data-bs-container", "body");
    btnAdd.setAttribute("data-bs-toggle", "popover");
    btnAdd.setAttribute("data-bs-placement", "top");
    btnAdd.setAttribute("data-bs-content", "Ajouté &#x2705;");
    btnAdd.setAttribute("data-bs-html", "true");
    btnAdd.setAttribute("aria-describedby", "checked");

    ulPizza.appendChild(liPizza);
    liPizza.appendChild(imgPizza);
    liPizza.appendChild(divText);
    liPizza.appendChild(divCount);
    liPizza.appendChild(btnAdd)
    divText.appendChild(nomPizza);
    divText.appendChild(ingredients);
    divText.appendChild(prix);
    divCount.appendChild(pCount);

    // Initialiser le popover après avoir ajouté le bouton au DOM
    setTimeout(() => {
        const popover = new bootstrap.Popover(btnAdd, {
            trigger: 'manual',
            html: true
        });
    }, 0);
}

// ajoute ou retire le nombre de pizzas voulu
function addPizza(event) {
    if (event.target.classList.contains("bi-plus-circle")) {
        event.target.previousSibling.textContent++;
        
    }
    if (event.target.classList.contains("bi-dash-circle")) {
        event.target.nextSibling.textContent--;
        if (event.target.nextSibling.textContent <= 0) {
            event.target.nextSibling.textContent = 0
        }
    }
}

// ajoute a la commande
function addCommande(event) {
    if (event.target.tagName === "BUTTON") {
        for (let i = 0; i < pizzas.length; i++) {
            if (pizzas[i].nom_pizza == event.target.previousSibling.previousSibling.firstChild.textContent) {
                console.log(event.target.previousSibling.previousSibling.firstChild.textContent);
                
                const count = document.getElementsByClassName("count")[i];
                let countPizza = parseInt(count.textContent);
                let prixPizzas = pizzas[i].prix_pizza * countPizza;
                nbPizza.classList.remove("d-none");
                nbPizza.textContent = Number(nbPizza.textContent) + countPizza;

                // Vérifier si la pizza existe déjà dans la commande
                let pizzaExistante = commandePizza.find(pizza => pizza.nom_pizza === pizzas[i].nom_pizza);

                if (pizzaExistante) {
                    // Si la pizza existe déjà, incrémenter les valeurs
                    pizzaExistante.nombre = parseInt(pizzaExistante.nombre) + countPizza;
                    pizzaExistante.prixtotal += prixPizzas;
                } else {
                    // Sinon, ajouter la pizza à la commande
                    commandePizza.push({
                        nom: pizzas[i].nom_pizza,
                        prix: parseFloat(pizzas[i].prix_pizza),
                        nombre: countPizza,
                        prixtotal: prixPizzas
                    });
                    saveCommande();
                }
            }
        }
        // Gérer le popover après l'ajout
        const popover = bootstrap.Popover.getInstance(event.target);
        if (popover) {
            popover.show();
            setTimeout(() => {
                popover.hide();
            }, 1500);
        }
    }
}

// affiche commande en cours
export function afficheCommande() {
    containerPizza.innerHTML = "";
    const ulPizza = document.createElement("ul");
    ulPizza.classList.add("list-group", "list-group-flush", "mt-3", "rounded");
    containerPizza.appendChild(ulPizza);
    let prixTotal = 0;
    commandePizza.forEach(element => {
        const liPizza = document.createElement("li");
        const nomPizza = document.createElement("p");
        const prixPizza = document.createElement("span");
        const divSupp = document.createElement("p");

        liPizza.classList.add("list-group-item", "list-group-item-success", "position-relative", "col-md-6", "mx-md-auto");
        nomPizza.classList.add("m-0", "fw-semibold", "fs-4", "text-decoration-underline");
        nomPizza.textContent = `${element.nom}`;
        prixPizza.classList.add("d-flex", "justify-content-end", "fs-4", "fw-semibold");
        prixPizza.textContent = `${element.prixtotal} €`;
        divSupp.classList.add("position-absolute", "top-0", "end-0", "fs-5")
        divSupp.innerHTML = `<p class="d-flex p-sm-1 mt-1"><i class="bi bi-dash-circle mx-1 moins"></i><span class="count">${element.nombre}</span><i class="bi bi-plus-circle mx-1 plus"></i></p>`

        ulPizza.appendChild(liPizza);
        liPizza.appendChild(nomPizza);
        liPizza.appendChild(prixPizza);
        liPizza.appendChild(divSupp)
        prixTotal = prixTotal + element.prixtotal;
    });

    const divPrix = document.createElement("div");
    const pTotal = document.createElement("p");
    const btnCommande = document.createElement("button");

    divPrix.classList.add("d-flex", "flex-column", "justify-content-end", "p-1");
    pTotal.classList.add("align-self-center", "mt-2", "fw-bold");
    pTotal.textContent = `Total: ${prixTotal} €`;
    btnCommande.classList.add("btn", "btn-success", "my-1", "commande", "col-md-6", "mx-auto")
    btnCommande.textContent = "Commander";

    containerPizza.appendChild(divPrix);
    divPrix.appendChild(pTotal);
    divPrix.appendChild(btnCommande);
}

//modifie la commande +/- jusqu'à supppression
function modifieCommande(event) {

    if (event.target.classList.contains("plus")) {
        for (let i = 0; i < commandePizza.length; i++) {
            if (commandePizza[i].nom == event.target.parentElement.parentElement.parentElement.firstChild.textContent) {
                commandePizza[i].nombre++;
                commandePizza[i].prixtotal += parseFloat(commandePizza[i].prix);
                nbPizza.textContent++;

                afficheCommande()
            }
        }
    }
    if (event.target.classList.contains("moins")) {
        const nomPizzaARetirer = event.target.parentElement.parentElement.parentElement.firstChild.textContent;
        // Chercher la pizza dans le tableau de commandes
        const indexPizza = commandePizza.findIndex(pizza => pizza.nom === nomPizzaARetirer);
        if (indexPizza !== -1) {
            commandePizza[indexPizza].nombre--;

            // Mettre à jour le prix total
            commandePizza[indexPizza].prixtotal = commandePizza[indexPizza].nombre * commandePizza[indexPizza].prix;

            // Mettre à jour l'affichage
            const nombreElement = event.target.nextElementSibling;
            nombreElement.textContent = commandePizza[indexPizza].nombre;
            if (commandePizza[indexPizza].nombre <= 0) {
                commandePizza.splice(indexPizza, 1);
            }

            // Mettre à jour le compteur total de pizzas
            const totalPizzas = commandePizza.reduce((total, pizza) => total + pizza.nombre, 0);
            nbPizza.textContent = Math.max(0, totalPizzas);

            afficheCommande();
        }
    }
    saveCommande();
}

//affiche validation de commande 
function afficheValidation(event) {
    if (event.target.classList.contains("payer")) {
        if (infoClient.length !== 0) {
            containerPizza.innerHTML = "";
            infoClient[0].commande = commandePizza
            console.log(infoClient);

            const divCard = document.createElement("section");
            const cardBody = document.createElement("div");
            const cardTitle = document.createElement("h4");
            const cardText = document.createElement("p");

            divCard.classList.add("card", "w-75", "mx-auto", "border-success");
            cardBody.classList.add("card-body", "text-success");
            cardTitle.classList.add("card-title");
            cardTitle.textContent = "Commande en cours de préparation";
            cardText.classList.add("card-text");
            cardText.innerHTML = `Votre commande a été validé.<br> 
         Merci d'avoir commandé chez Casa Di Jo.`;

            containerPizza.appendChild(divCard);
            divCard.appendChild(cardBody);
            cardBody.appendChild(cardTitle);
            cardBody.appendChild(cardText);
        }
    }
}

filtre.addEventListener("change", filtrerPizza);
ulPizza.addEventListener("click", addPizza);
ulPizza.addEventListener("click", addCommande);
commande.addEventListener("click", afficheCommande);
containerPizza.addEventListener("click", modifieCommande);
containerPizza.addEventListener("click", afficheForm);
containerPizza.addEventListener("click", controleForm);
containerPizza.addEventListener("click", afficheValidation);

