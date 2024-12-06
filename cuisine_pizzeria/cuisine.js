"use strict"

// recupère les commandes validé
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
console.log(commandeClient);

const enPreparation = document.getElementById("preparation");
const prete = document.getElementById("prete")

function afficheCommande(data) {
    const divCard = document.createElement("div");
    const cardBody = document.createElement("div");
    const nomClient = document.createElement("h4");
    const phoneClient = document.createElement("p");
    const cardAdresse = document.createElement("p");
    const cardPizza = document.createElement("p");
    const idCard = document.createElement("p");
    const btnEtat = document.createElement("button");

    divCard.classList.add("card", "col-md-4", "mb-3");
    cardBody.classList.add("card-body");
    nomClient.classList.add("card-title");
    phoneClient.classList.add("card-text", "fw-semibold");
    cardAdresse.classList.add("card-text");
    cardPizza.classList.add("card-text");
    idCard.classList.add("card-text");
    btnEtat.classList.add("btn", "btn-outline-success");
    btnEtat.textContent = "Commande prête"

    for (const key in data) {
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
    divCard.appendChild(cardBody)
    cardBody.appendChild(nomClient)
    cardBody.appendChild(phoneClient)
    cardBody.appendChild(cardAdresse)
    cardBody.appendChild(cardPizza)
    cardBody.appendChild(idCard)
    cardBody.appendChild(btnEtat)
}

commandeClient.forEach(element => {
    afficheCommande(element);
});

//change l'état de la commande de "en préparation a prête" et les passes dans le section correspondante
function changerEtat(event) {
    if (event.target.tagName === "BUTTON") {
        for (let i = 0; i < commandeClient.length; i++) {

            if (event.target.previousSibling.textContent == commandeClient[i].id) {

                const divCard = document.createElement("div");
                const cardBody = document.createElement("div");
                const nomClient = document.createElement("h4");
                const phoneClient = document.createElement("p");
                const cardAdresse = document.createElement("p");
                const cardPizza = document.createElement("p");
                const idCard = document.createElement("p");
                const btnEtat = document.createElement("button");

                divCard.classList.add("card", "col-md-4", "mb-3");
                cardBody.classList.add("card-body");
                nomClient.classList.add("card-title");
                phoneClient.classList.add("card-text", "fw-semibold");
                cardAdresse.classList.add("card-text");
                cardPizza.classList.add("card-text");
                idCard.classList.add("card-text");
                btnEtat.classList.add("btn", "btn-outline-success");
                btnEtat.textContent = "Terminer"

                for (const key in commandeClient[i]) {
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

                prete.appendChild(divCard)
                divCard.appendChild(cardBody)
                cardBody.appendChild(nomClient)
                cardBody.appendChild(phoneClient)
                cardBody.appendChild(cardAdresse)
                cardBody.appendChild(cardPizza)
                cardBody.appendChild(idCard)
                cardBody.appendChild(btnEtat)
            }

        }
        event.target.parentElement.parentElement.remove();
    }
}

//terminer au click lorsque la commande a été récupérer ou livré
function terminerCommande(event) {
    if (event.target.tagName === "BUTTON") {
            event.target.parentElement.parentElement.remove();
    }
}

enPreparation.addEventListener("click", changerEtat);
prete.addEventListener("click", terminerCommande)
