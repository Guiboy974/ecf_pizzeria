"use strict"

import { recuperePizza } from "./recuperePizza.js";

const pizzas = await recuperePizza();

const ulPizza = document.getElementById("list-pizza");
const filtre = document.getElementById("select-filtre");
const commande = document.getElementById("commande");
const containerPizza = document.getElementById("main");
let commandePizza = [];

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
    ulPizza.innerHTML = "";
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
    const btnAdd = document.createElement("button")

    liPizza.classList.add("list-group-item", "list-group-item-success", "p-2", "d-flex", "position-relative", "align-sm-items-center");
    imgPizza.classList.add("p-1", "mt-2", "w-25", "h-25");
    imgPizza.setAttribute("src", data.image);
    imgPizza.setAttribute("alt", `pizza ${data.nom}`);
    divText.classList.add("mt-2", "mx-sm-2");
    divCount.classList.add("fs-5", "fw-semibold", "position-absolute", "top-0", "end-0");
    nomPizza.classList.add("m-0");
    nomPizza.textContent = data.nom;
    ingredients.classList.add("m-0", "fs-6", "text-wrap");
    ingredients.textContent = data.ingredients;
    prix.classList.add("mb-4", "fw-semibold");
    prix.textContent = `Prix : ${data.prix} €`;
    pCount.innerHTML = '<p class="d-flex p-sm-2 m-1"><i class="bi bi-dash-circle mx-1"></i><span class="count">0</span><i class="bi bi-plus-circle mx-1"></i></p>';
    btnAdd.classList.add("btn", "btn-success", "m-1", "position-absolute", "bottom-0", "end-0");
    btnAdd.textContent = "Ajouter";

    ulPizza.appendChild(liPizza);
    liPizza.appendChild(imgPizza);
    liPizza.appendChild(divText);
    liPizza.appendChild(divCount);
    liPizza.appendChild(btnAdd)
    divText.appendChild(nomPizza);
    divText.appendChild(ingredients);
    divText.appendChild(prix);
    divCount.appendChild(pCount);
}

// ajoute le nombre de pizzas
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
            if (pizzas[i].nom == event.target.previousSibling.previousSibling.firstChild.textContent) {
                const count    = document.getElementsByClassName("count")[i];
                let countPizza = count.textContent;
                let prixPizzas = pizzas[i].prix * countPizza;
                commandePizza.push({
                    nom: pizzas[i].nom,
                    nombre: count.textContent,
                    prix: prixPizzas
                })
            }
        }
    }
}

// affiche commande en cours
function afficheCommande() {
    containerPizza.innerHTML = "";
    const ulPizza = document.createElement("ul");
    ulPizza.classList.add("list-group", "list-group-flush", "mt-3", "rounded");
    containerPizza.appendChild(ulPizza);
    let prixTotal = 0;
    commandePizza.forEach(element => {
        const liPizza   = document.createElement("li");
        const nomPizza  = document.createElement("p");
        const prixPizza = document.createElement("span");
        
        liPizza.classList.add("list-group-item", "list-group-item-success");
        nomPizza.classList.add("m-0", "fw-semibold");
        nomPizza.textContent = `${element.nom} x${element.nombre}`;
        prixPizza.classList.add("d-flex", "justify-content-end", "fs-4", "fw-semibold");
        prixPizza.textContent = `${element.prix} €`;
        
        ulPizza.appendChild(liPizza);
        liPizza.appendChild(nomPizza);
        liPizza.appendChild(prixPizza);
        prixTotal = prixTotal + element.prix; 
    });
    
    const divPrix     = document.createElement("div");
    const pTotal      = document.createElement("p");
    const btnCommande = document.createElement("button");

    divPrix.classList.add("d-flex", "flex-column", "justify-content-end", "p-1");
    pTotal.classList.add("align-self-center", "mt-2","fw-bold");
    pTotal.textContent = `Total: ${prixTotal} €`;
    btnCommande.classList.add("btn", "btn-success", "m-1");
    btnCommande.textContent = "Commander";

    containerPizza.appendChild(divPrix);
    divPrix.appendChild(pTotal);
    divPrix.appendChild(btnCommande);
}

filtre.addEventListener("change", filtrerPizza);
ulPizza.addEventListener("click", addPizza);
ulPizza.addEventListener("click", addCommande);
commande.addEventListener("click", afficheCommande);

