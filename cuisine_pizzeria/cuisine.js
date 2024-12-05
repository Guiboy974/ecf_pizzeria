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
const enLivraison = document.getElementById("livraison")
const aEmporter = document.getElementById("emporte")

function afficheCommande(data) {
    const divCard = document.createElement("div");
    const cardBody = document.createElement("div");
    const nomClient = document.createElement("h4");
    const phoneClient = document.createElement("p");
    const cardAdresse = document.createElement("p");
    const cardPizza = document.createElement("p");
    const idCard = document.createElement("p");
    const btnEtat = document.createElement("btn");

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
                console.log(nomPizza);
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
            if(event.target.previousSibling.textContent == commandeClient[i].id ){
                console.log(event.target, commandeClient[i].id);
                
            }
        }
    }
}

enPreparation.addEventListener("click", changerEtat);

