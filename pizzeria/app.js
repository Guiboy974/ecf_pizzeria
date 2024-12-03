"use strict"

import { recuperePizza } from "./recuperePizza.js";

const pizzas = await recuperePizza();

console.log(pizzas);


const listPizza = document.getElementById("list-pizza");
const filtre = document.getElementById("select-filtre");
const commande = document.getElementById("commande");
const container = document.getElementById("main");

//affichage initiale des pizza
pizzas.forEach(pizzas => displayPizza(pizzas));

// filtre les pizzas
function filtrerPizza(event) {
    const optionValue = event.target.value;
    const pizzasFiltrees = pizzas.filter(pizzas => {
        switch (optionValue) {
            case "1":
                return pizzas.base === "tomate";
            case "2":
                return pizzas.base === "crème";
            default:
                return true; // affiche toutes les pizzas
        }
    });
    displayPizzas(pizzasFiltrees);
}

// affiche les pizzas
function displayPizzas(pizzas) {
    listPizza.innerHTML = "";
    pizzas.forEach(pizza => displayPizza(pizza));
}

// affiche less pizzas
function displayPizza(data) {
    const liPizza = document.createElement("li");
    const imgPizza = document.createElement("img");
    const divText = document.createElement("div");
    const divCount = document.createElement("div");
    const nomPizza = document.createElement("h4");
    const ingredients = document.createElement("p");
    const prix = document.createElement("p");
    const pCount = document.createElement("p");

    liPizza.classList.add("list-group-item", "list-group-item-success", "rounded", "p-2", "m-1", "d-flex", "position-relative", "align-sm-items-center");
    imgPizza.classList.add("p-1", "mt-2", "w-25", "h-25");
    imgPizza.setAttribute("src", data.image);
    imgPizza.setAttribute("alt", `pizza ${data.nom}`);
    divText.classList.add("mt-2", "mx-sm-2");
    divCount.classList.add("fs-5", "fw-semibold", "position-absolute", "bottom-0", "end-0");
    nomPizza.classList.add("m-0");
    nomPizza.textContent = data.nom;
    ingredients.classList.add("m-0", "fs-6", "text-wrap");
    ingredients.textContent = data.ingredients;
    prix.classList.add("mb-4", "fw-semibold");
    prix.textContent = `Prix : ${data.prix} €`;
    pCount.innerHTML = '<p class="d-flex p-sm-2 m-1"><i class="bi bi-dash-circle mx-1"></i><span class="count">0</span><i class="bi bi-plus-circle mx-1"></i></p>';

    listPizza.appendChild(liPizza);
    liPizza.appendChild(imgPizza);
    liPizza.appendChild(divText);
    liPizza.appendChild(divCount);
    divText.appendChild(nomPizza);
    divText.appendChild(ingredients);
    divText.appendChild(prix);
    divCount.appendChild(pCount);
}


// ajoute les pizzas a commande
function addPizzas(event) {
    for (let i = 0; i < pizzas.length; i++) {
        const count = document.getElementsByClassName("count")[i];
    }
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

// affiche commande en cours
function afficheCommande() {
    container.innerHTML = "";
}

filtre.addEventListener("change", filtrerPizza);
listPizza.addEventListener("click", addPizzas);
commande.addEventListener("click", afficheCommande);
