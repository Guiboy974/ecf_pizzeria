"use strict"

const listPizza = document.getElementById("list-pizza");
const filtre = document.getElementById("select-filtre");
const commande = document.getElementById("commande");
const container = document.getElementById("main");

// recupère et utilise les données json des pizzas
async function recuperePizza() {
    try {
        const listJson = await Promise.all([
            fetch('../margherita.json'),
            fetch('../reine.json'),
            fetch('../dijo.json'),
            fetch('../4fromage.json'),
            fetch('../montagnard.json'),
            fetch('../carbonara.json')
        ]);

        const data = await Promise.all(
            listJson.map(res => res.json()),
        );
        console.log(data)

        // filtre les pizzas
        function filtrerPizza(event) {
            const optionValue = event.target.value;
            const pizzasFiltrees = data.filter(pizza => {
                switch (optionValue) {
                    case "1":
                        return pizza.base === "tomate";
                    case "2":
                        return pizza.base === "crème";
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

        filtre.addEventListener("change", filtrerPizza);
        listPizza.addEventListener("click", addPizzas);


        //affichage initiale des pizza
        data.forEach(data => displayPizza(data));
    } catch (error) {
        console.log(error);
    }
}
recuperePizza()

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
    pCount.innerHTML = '<p class="d-flex p-sm-2 m-1"><i class="bi bi-dash-circle mx-1"></i><span class="count"></span><i class="bi bi-plus-circle mx-1"></i></p>';

    listPizza.appendChild(liPizza);
    liPizza.appendChild(imgPizza);
    liPizza.appendChild(divText);
    liPizza.appendChild(divCount);
    divText.appendChild(nomPizza);
    divText.appendChild(ingredients);
    divText.appendChild(prix);
    divCount.appendChild(pCount);
}


//ajoute les pizzas a commande
// function addPizzas(event) {
//     data.forEach(data => {
//         const count = document.getElementsByClassName("count");
//         count.textContent = 0;
//         if (event.target.contains(".bi-plus-circle")) {
//             count++;
//             console.log(event.target);

//         }
//     });
// }

// affiche commande en cours
function afficheCommande() {

}
commande.addEventListener("click", afficheCommande);
