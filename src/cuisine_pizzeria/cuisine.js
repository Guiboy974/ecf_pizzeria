"use strict"

async function recupereCommande() {
    try {
        const commandes = await fetch('../testCommande.json')
        const data = await commandes.json()
        return data

    } catch (error) {
        console.log(error);
    }
}

const commandeClient = await recupereCommande();

const historique = [];

const enPreparation = document.getElementById("preparation");
const prete = document.getElementById("prete");

function afficheCommande(data) {
    const divCard = document.createElement("div");
    const cardHeader = document.createElement("div");
    const typeCommande = document.createElement("h5");
    const cardBody = document.createElement("div");
    const nomClient = document.createElement("h5");
    const phoneClient = document.createElement("p");
    const cardAdresse = document.createElement("p");
    const idCard = document.createElement("p");
    const cardFooter = document.createElement("div");
    const divPizza = document.createElement("div");
    const titleFooter = document.createElement("div");
    const cardPizza = document.createElement("p");
    const divBtnFooter = document.createElement("div");
    const btnEtat = document.createElement("button");

    divCard.classList.add("card", "col-lg-2", "col-sm-4", "m-1");
    cardHeader.classList.add("card-header", "bg-success-subtle",);
    cardBody.classList.add("card-body");
    nomClient.classList.add("card-title");
    phoneClient.classList.add("card-text", "fw-semibold");
    cardAdresse.classList.add("card-text");
    idCard.classList.add("card-text", "card-id");
    cardFooter.classList.add("card-footer");
    divPizza.classList.add("border", "border-danger", "rounded", "p-2", "my-2");
    titleFooter.classList.add("card-title");
    titleFooter.textContent = "Pizza(s)";
    cardPizza.classList.add("card-text");
    divBtnFooter.classList.add("text-center")
    btnEtat.classList.add("btn", "btn-success");
    btnEtat.textContent = "Commande prête";

    for (const key in data) {
        if (data.hasOwnProperty(key) && key === "mode") {
            typeCommande.textContent = data.mode;
        }
        if (data.hasOwnProperty(key) && key === "client") {
            nomClient.textContent = data.client;
        }
        if (data.hasOwnProperty(key) && key === "telephone") {
            phoneClient.textContent = data.telephone;
        }
        if (data.hasOwnProperty(key) && key === "adresse") {
            cardAdresse.textContent = data.adresse;
        }
        if (data.hasOwnProperty(key) && key === "adresseZip") {
            cardAdresse.textContent = `${cardAdresse.textContent}, ${data.adresseZip}`;
        }
        if (data.hasOwnProperty(key) && key === "commande") {
            const nomsPizza = [];
            data.commande.forEach(commande => {
                const nomPizza = `${commande.nom} x ${commande.nombre}`
                nomsPizza.push(nomPizza)
            })
            cardPizza.textContent = nomsPizza.join(" , ")
        }
        if (data.hasOwnProperty(key) && key === "id") {
            idCard.textContent = data.id;
        }
    }

    enPreparation.appendChild(divCard)
    divCard.appendChild(cardHeader)
    cardHeader.appendChild(typeCommande)
    divCard.appendChild(cardBody)
    cardBody.appendChild(nomClient)
    cardBody.appendChild(phoneClient)
    cardBody.appendChild(cardAdresse)
    cardBody.appendChild(idCard)
    divCard.appendChild(cardFooter)
    cardFooter.appendChild(divPizza)
    cardFooter.appendChild(divBtnFooter)
    divPizza.appendChild(cardPizza)
    divBtnFooter.appendChild(btnEtat)
}

commandeClient.forEach(element => {
    afficheCommande(element);
});

//change l'état de la commande de "en préparation a prête" et les passes dans le section correspondante
function changerEtat(event) {
    if (event.target.tagName === "BUTTON") {
        const idClient = event.target.closest(".card").querySelector(".card-id");
        for (let i = 0; i < commandeClient.length; i++) {
            if (idClient.textContent == commandeClient[i].id) {

                const divCard = document.createElement("div");
                const cardHeader = document.createElement("div");
                const statusCommande = document.createElement("h5");
                const typeCommande = document.createElement("h6");
                const cardBody = document.createElement("div");
                const nomClient = document.createElement("h5");
                const phoneClient = document.createElement("p");
                const cardAdresse = document.createElement("p");
                const idCard = document.createElement("p");
                const cardFooter = document.createElement("div");
                const divPizza = document.createElement("div");
                const titleFooter = document.createElement("div");
                const cardPizza = document.createElement("p");
                const divBtnFooter = document.createElement("div");
                const btnEtat = document.createElement("button");

                divCard.classList.add("card", "border-success", "col-lg-2", "col-sm-4", "m-1");
                cardHeader.classList.add("card-header", "bg-success-subtle",);
                cardBody.classList.add("card-body", "border-success");
                nomClient.classList.add("card-title");
                phoneClient.classList.add("card-text", "fw-semibold");
                cardAdresse.classList.add("card-text");
                idCard.classList.add("card-text");
                cardFooter.classList.add("card-footer", "border-success");
                divPizza.classList.add("p-2", "my-2");
                titleFooter.classList.add("card-title");
                titleFooter.textContent = "Pizza(s)"
                cardPizza.classList.add("card-text");
                btnEtat.classList.add("btn", "btn-success");
                btnEtat.textContent = "Terminer"

                for (const key in commandeClient[i]) {
                    if (commandeClient[i].hasOwnProperty(key) && key === "mode") {
                        typeCommande.textContent = commandeClient[i].mode;
                    }
                    if (commandeClient[i].hasOwnProperty(key) && key === "client") {
                        nomClient.textContent = commandeClient[i].client;
                    }
                    if (commandeClient[i].hasOwnProperty(key) && key === "telephone") {
                        phoneClient.textContent = commandeClient[i].telephone;
                    }
                    if (commandeClient[i].hasOwnProperty(key) && key === "adresse") {
                        cardAdresse.textContent = commandeClient[i].adresse;
                    }
                    if (commandeClient[i].hasOwnProperty(key) && key === "adresseZip") {
                        cardAdresse.textContent = `${cardAdresse.textContent}, ${commandeClient[i].adresseZip}`;
                    }
                    if (commandeClient[i].hasOwnProperty(key) && key === "commande") {
                        const nomsPizza = [];
                        commandeClient[i].commande.forEach(commande => {
                            const nomPizza = `${commande.nom} x ${commande.nombre}`
                            nomsPizza.push(nomPizza)
                        })
                        cardPizza.textContent = nomsPizza.join(" , ")
                    }
                    if (commandeClient[i].hasOwnProperty(key) && key === "id") {
                        idCard.textContent = commandeClient[i].id;
                    }
                }
                const idClient = event.target.closest(".card").querySelector(".card-id");
                for (let i = 0; i < commandeClient.length; i++) {
                    if (idClient.textContent == commandeClient[i].id)
                        prete.appendChild(divCard)
                    divCard.appendChild(cardHeader)
                    cardHeader.appendChild(statusCommande)
                    cardHeader.appendChild(typeCommande)
                    divCard.appendChild(cardBody)
                    cardBody.appendChild(nomClient)
                    cardBody.appendChild(phoneClient)
                    cardBody.appendChild(cardAdresse)
                    cardBody.appendChild(idCard)
                    divCard.appendChild(cardFooter)
                    cardFooter.appendChild(divPizza)
                    cardFooter.appendChild(divBtnFooter)
                    divPizza.appendChild(cardPizza)
                    divBtnFooter.appendChild(btnEtat)
                }

            }
            event.target.closest(".card").remove();
        }
    }
}

//terminer au click lorsque la commande a été récupérer ou livré
function terminerCommande(event) {
    if (event.target.tagName === "BUTTON") {
        const idClient = event.target.closest(".card").querySelector(".card-id");
        for (let i = 0; i < commandeClient.length; i++) {
            if (idClient.textContent == commandeClient[i].id) {
                historique.push(commandeClient[i])
            }
        }
        event.target.closest(".card").remove();
    }
}

enPreparation.addEventListener("click", changerEtat);
prete.addEventListener("click", terminerCommande);
