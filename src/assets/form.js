"use strict"

export let infoClient = [];

import { containerPizza, commandePizza } from "./app.js"

//TODO : ajouter les informations de la commande dans le fichier json pizza + client
//TODO : ajoute date et heure de la commande

async function getClientData() {
    try {
        const response = await fetch('http://localhost/ECF/src/controller/ClientController.php', {
            method: 'GET',
            headers: {
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
console.log(dataClient);



// affiche le formulaire de commande final
export function afficheForm(event) {
    if (event.target.classList.contains("commande")) {

        //vérifie si la commande est vide avant chargement du formulaire
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

            //creation des différentes div
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

            //input nom
            const labelNom = document.createElement("label");
            const inputNom = document.createElement("input");
            labelNom.textContent = "Nom";
            labelNom.classList.add("form-label");
            labelNom.setAttribute("for", "inputNom");
            inputNom.classList.add("form-control");
            inputNom.setAttribute("id", "inputNom");
            inputNom.setAttribute("type", "text");
            divNom.appendChild(labelNom);
            divNom.appendChild(inputNom);

            //input téléphone
            const labelPhone = document.createElement("label");
            const inputPhone = document.createElement("input");
            labelPhone.textContent = "Téléphone";
            labelPhone.classList.add("form-label");
            labelPhone.setAttribute("for", "inputPhone");
            inputPhone.classList.add("form-control");
            inputPhone.setAttribute("id", "inputPhone");
            inputPhone.setAttribute("type", "number");
            divPhone.appendChild(labelPhone);
            divPhone.appendChild(inputPhone);

            //input adresse principal
            const labelAdresse = document.createElement("label");
            const inputAdresse = document.createElement("input");
            labelAdresse.textContent = "Adresse";
            labelAdresse.classList.add("form-label");
            labelAdresse.setAttribute("for", "inputAdresse");
            inputAdresse.classList.add("form-control");
            inputAdresse.setAttribute("id", "inputAdresse");
            inputAdresse.setAttribute("type", "text");
            inputAdresse.setAttribute("placeholder", "12 rue de chez toi")
            divAdresseP.appendChild(labelAdresse);
            divAdresseP.appendChild(inputAdresse);

            //bouton Payer
            const btnPayer = document.createElement("button")
            btnPayer.textContent = "Payer";
            btnPayer.classList.add("btn", "btn-success", "payer")
            btnPayer.setAttribute("type", "submit")
            divPayer.appendChild(btnPayer)

            // desactive une partie dur formulaire
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

//controle le formulaire avant envoie
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
        const regexTel = new RegExp(/[0-9]{10,}/g);
        const regexAdresse = new RegExp("^\\d+\\s+[a-zA-ZÀ-ÿ\\s-]+\\s+\\d{5}\\s+[a-zA-ZÀ-ÿ\\s-]+$");

        if (regexText.test(inputNom.value)) {
            if (regexTel.test(inputPhone.value)) {
                inputNom.classList.remove("is-invalid");
                inputPhone.classList.remove("is-invalid");

                if (radioLivraison.checked === true) {
                    if (regexAdresse.test(inputAdresse.value)) {
                        inputAdresse.classList.remove("is-invalid");

                        //ajoute toute les informations de livraison
                        infoClient.push({
                            client: inputNom.value,
                            telephone: inputPhone.value,
                            adresse: inputAdresse.value,
                            recuperation: "Livraison"
                        })

                        console.log(infoClient);
                        inputVille.classList.remove("is-invalid");

                    } else {
                        inputAdresse.value = "";
                        inputAdresse.classList.add("is-invalid");
                    }

                } else if (radioEmporte.checked === false) {
                    divAlert.innerHTML = `<div class="alert alert-danger m-2" role="alert">*option de récupération non sélectionner</div>`;
                    containerPizza.appendChild(divAlert);
                }

                // ajoute des nom et numéro a la commande uniquement si a emporté
                infoClient.push({
                    client: inputNom.value,
                    telephone: inputPhone.value,
                    recuperation: "Emporté"
                })

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

