"use strict"

export let infoClient = [];

import { containerPizza, commandePizza } from "./app.js"

// Fonction pour récupérer les données du client
async function getClientData() {
    try {
        const response = await fetch('http://localhost/ECF/src/index.php?action=client', {
            method: "GET",
            headers : {  
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const userData = await response.json();
        return userData

    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}
// Appeler la fonction pour récupérer les données de l'utilisateur
const dataClient = await getClientData();
// console.log(dataClient);

// Fonction pour afficher le formulaire de commande final
export async function afficheForm(event) {
    const userData = await getClientData();
    if (!userData) {
        window.location.href = 'index.php?action=login';
        return;
    }

    if (event.target.classList.contains("commande")) {

        // Vérifie si la commande est vide avant chargement du formulaire
        if (commandePizza.length === 0) {
            const divAlert = document.createElement("div");
            divAlert.innerHTML = "";
            containerPizza.appendChild(divAlert);
            divAlert.innerHTML = `<div class="alert alert-danger m-2" role="alert">*commande vide</div>`

        } else {
            event.target.remove()
            const titreForm = document.createElement("h2")
            const form = document.createElement("form")
            titreForm.classList.add("m-2")
            titreForm.textContent = "Finaliser votre commande"
            containerPizza.appendChild(titreForm);
            containerPizza.appendChild(form);

            // Création des différentes div
            const fielsetRadio = document.createElement("fieldset");
            const divRadioL = document.createElement("div");
            const divRadioE = document.createElement("div");
            fielsetRadio.classList.add("d-md-flex")
            divRadioL.classList.add("form-check", "mx-3");
            divRadioL.innerHTML = `<input class="form-check-input" type="radio" name="flexRadio" id="livraison">
              <label class="form-check-label" for="livraison">Livraison</label>`;
            divRadioE.classList.add("form-check", "mx-3", "mt-2", "mt-md-0");
            divRadioE.innerHTML = `<input class="form-check-input" type="radio" name="flexRadio" id="emporte">
              <label class="form-check-label" for="emporte">à emporté</label>`;
            form.appendChild(fielsetRadio);
            fielsetRadio.appendChild(divRadioL);
            fielsetRadio.appendChild(divRadioE);

            const fielsetInput = document.createElement("fieldset");
            const divNom = document.createElement("div");
            const divPhone = document.createElement("div");
            const divAdresseP = document.createElement("div");
            const divPayer = document.createElement("div");

            fielsetInput.classList.add("row", "g-3", "mt-md-2");
            divNom.classList.add("col-md-6");
            divPhone.classList.add("col-md-6");
            divAdresseP.classList.add("col-md-12");
            divPayer.classList.add("col-12", "mt-3");

            form.appendChild(fielsetInput);
            fielsetInput.appendChild(divNom);
            fielsetInput.appendChild(divPhone);
            fielsetInput.appendChild(divAdresseP);
            fielsetInput.appendChild(divPayer);

            // Input nom
            const labelNom = document.createElement("label");
            const inputNom = document.createElement("input");
            labelNom.textContent = "Nom";
            labelNom.classList.add("form-label");
            labelNom.setAttribute("for", "inputNom");
            inputNom.classList.add("form-control");
            inputNom.setAttribute("id", "inputNom");
            inputNom.setAttribute("type", "text");
            inputNom.value = dataClient.name;
            divNom.appendChild(labelNom);
            divNom.appendChild(inputNom);

            // Input téléphone
            const labelPhone = document.createElement("label");
            const inputPhone = document.createElement("input");
            labelPhone.textContent = "Téléphone";
            labelPhone.classList.add("form-label");
            labelPhone.setAttribute("for", "inputPhone");
            inputPhone.classList.add("form-control");
            inputPhone.setAttribute("id", "inputPhone");
            inputPhone.setAttribute("type", "number");
            inputPhone.value = dataClient.telephone;
            divPhone.appendChild(labelPhone);
            divPhone.appendChild(inputPhone);

            // Input adresse principal
            const labelAdresse = document.createElement("label");
            const inputAdresse = document.createElement("input");
            labelAdresse.textContent = "Adresse";
            labelAdresse.classList.add("form-label");
            labelAdresse.setAttribute("for", "inputAdresse");
            inputAdresse.classList.add("form-control");
            inputAdresse.setAttribute("id", "inputAdresse");
            inputAdresse.setAttribute("type", "text");
            inputAdresse.value = dataClient.adresse;
            divAdresseP.appendChild(labelAdresse);
            divAdresseP.appendChild(inputAdresse);

            // Bouton Payer
            const btnPayer = document.createElement("button")
            btnPayer.textContent = "Payer";
            btnPayer.classList.add("btn", "btn-success", "payer")
            btnPayer.setAttribute("method", "post")
            btnPayer.setAttribute("action", "index.php?action=commande")
            btnPayer.setAttribute("type", "submit")
            divPayer.appendChild(btnPayer)

            // Désactive une partie du formulaire
            const radioEmporte = document.getElementById("emporte");
            const radioLivraison = document.getElementById("livraison");
            fielsetRadio.addEventListener("click", () => {
                if (radioEmporte.checked === true) {
                    inputAdresse.setAttribute("disabled", true)

                } else if (radioLivraison.checked === true) {
                    inputAdresse.removeAttribute("disabled")

                }
            })

        }
    }

}

// Fonction pour contrôler le formulaire avant envoi
export function controleForm(event) {
    const radioLivraison = document.getElementById("livraison");
    const radioEmporte = document.getElementById("emporte");
    const inputNom = document.getElementById("inputNom");
    const inputPhone = document.getElementById("inputPhone");
    const inputAdresse = document.getElementById("inputAdresse");

    if (event.target.classList.contains("payer")) {

        event.preventDefault();

        const divAlert = document.createElement("div");
        divAlert.innerHTML = "";
        containerPizza.appendChild(divAlert);

        const regexText = new RegExp(/[a-zA-Z]{3,}/g);
        const regexTel = new RegExp(/[0-9]{9,}/g);
        const regexAdresse = new RegExp("^\\d+\\s+[a-zA-ZÀ-ÿ\\s-]+\\s+\\d{5}\\s+[a-zA-ZÀ-ÿ\\s-]+$");

        if (regexText.test(inputNom.value)) {
            if (regexTel.test(inputPhone.value)) {
                inputNom.classList.remove("is-invalid");
                inputPhone.classList.remove("is-invalid");

                if (radioLivraison.checked === true) {
                    if (regexAdresse.test(inputAdresse.value)) {
                        inputAdresse.classList.remove("is-invalid");

                        // Ajoute toutes les informations de livraison
                        infoClient.push({
                            id_client : dataClient.id,
                            client: inputNom.value,
                            telephone: inputPhone.value,
                            adresse: inputAdresse.value,
                            recuperation: "Livraison"
                        })

                        // console.log(infoClient);

                    } else {
                        inputAdresse.value = "";
                        inputAdresse.classList.add("is-invalid");
                    }

                } else if (radioEmporte.checked === true) {
                    
                    // Ajoute des nom et numéro à la commande uniquement si à emporter
                    infoClient.push({
                        id_client : dataClient.id,
                        client: inputNom.value,
                        telephone: inputPhone.value,
                        recuperation: "Emporté"
                    })
                } else {
                    divAlert.innerHTML = `<div class="alert alert-danger m-2" role="alert">*option de récupération non sélectionner</div>`;
                    containerPizza.appendChild(divAlert);
                }

            } else {
                inputPhone.value = "";
                inputPhone.classList.add("is-invalid");
            }
        } else {
            inputNom.value = "";
            inputNom.classList.add("is-invalid");
        }

    }
}
