"use strict"

export let infoClient = [];

import { afficheCommande, containerPizza } from "./app.js"

// affiche le formulaire de commande final
export function afficheForm(event) {
    if (event.target.classList.contains("commande")) {
        afficheCommande()

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
        const divAdresseS = document.createElement("div");
        const divCodeP = document.createElement("div");
        const divVille = document.createElement("div");
        const divPayer = document.createElement("div");

        fielsetInput.classList.add("row", "g-3", "mt-md-2");
        divNom.classList.add("col-md-6");
        divPhone.classList.add("col-md-6");
        divAdresseP.classList.add("col-md-12");
        divAdresseS.classList.add("col-md-12");
        divCodeP.classList.add("col-md-2");
        divVille.classList.add("col-md-6");
        divPayer.classList.add("col-12", "mt-3");

        form.appendChild(fielsetInput);
        fielsetInput.appendChild(divNom);
        fielsetInput.appendChild(divPhone);
        fielsetInput.appendChild(divAdresseP);
        fielsetInput.appendChild(divAdresseS);
        fielsetInput.appendChild(divCodeP);
        fielsetInput.appendChild(divVille);
        containerPizza.appendChild(divPayer);

        //input nom
        const labelNom = document.createElement("label");
        const inputNom = document.createElement("input");
        labelNom.textContent = "Nom";
        labelNom.classList.add("form-label");
        labelNom.setAttribute("for", "inputNom");
        inputNom.classList.add("form-control");
        inputNom.setAttribute("id", "inputNom");
        inputNom.setAttribute("type", "text");
        inputNom.setAttribute("required", "");
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
        inputPhone.setAttribute("type", "text");
        inputPhone.setAttribute("required", "");
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
        inputAdresse.setAttribute("required", "");
        divAdresseP.appendChild(labelAdresse);
        divAdresseP.appendChild(inputAdresse);

        //input adresse suite
        const labelAdresseS = document.createElement("label");
        const inputAdresseS = document.createElement("input");
        labelAdresseS.textContent = "Adresse complément";
        labelAdresseS.setAttribute("for", "inputAdresse2");
        inputAdresseS.classList.add("form-control");
        inputAdresseS.setAttribute("id", "inputAdresse2");
        inputAdresseS.setAttribute("type", "text");
        inputAdresseS.setAttribute("placeholder", "Appartement, étage, ...")
        inputAdresseS.setAttribute("required", "");
        divAdresseS.appendChild(labelAdresseS);
        divAdresseS.appendChild(inputAdresseS);

        //input code postal
        const labelCodeP = document.createElement("label");
        const inputCodeP = document.createElement("input");
        labelCodeP.textContent = "Code postal";
        labelCodeP.classList.add("form-label");
        labelCodeP.setAttribute("for", "inputCodeP");
        inputCodeP.classList.add("form-control");
        inputCodeP.setAttribute("id", "inputCodeP");
        inputCodeP.setAttribute("type", "text");
        inputCodeP.setAttribute("required", "");
        divCodeP.appendChild(labelCodeP);
        divCodeP.appendChild(inputCodeP);

        //input ville
        const labelVille = document.createElement("label");
        const inputVille = document.createElement("input");
        labelVille.textContent = "Code postal";
        labelVille.classList.add("form-label");
        labelVille.setAttribute("for", "inputVille");
        inputVille.classList.add("form-control");
        inputVille.setAttribute("id", "inputVille");
        inputVille.setAttribute("type", "text");
        inputVille.setAttribute("required", "");
        divVille.appendChild(labelVille);
        divVille.appendChild(inputVille);

        //bouton Payer
        const btnPayer = document.createElement("button")
        btnPayer.textContent = "Payer";
        btnPayer.classList.add("btn", "btn-success", "payer")
        divPayer.appendChild(btnPayer)

        // desactive une partie dur formulaire
        const radioEmporte = document.getElementById("emporte");
        const radioLivraison = document.getElementById("livraison");
        fielsetRadio.addEventListener("click", () => {
            if (radioEmporte.checked === true) {
                inputAdresse.setAttribute("disabled", true)
                inputAdresseS.setAttribute("disabled", true)
                inputCodeP.setAttribute("disabled", true)
                inputVille.setAttribute("disabled", true)
            } else if (radioLivraison.checked === true) {
                inputAdresse.removeAttribute("disabled")
                inputAdresseS.removeAttribute("disabled")
                inputCodeP.removeAttribute("disabled")
                inputVille.removeAttribute("disabled")
            }
        })

    }
}

//controle le formulaire avant envoie
export function controleForm(event) {
    const radioLivraison = document.getElementById("livraison")

    if (event.target.classList.contains("payer")) {
        if (radioLivraison.checked === true) {

            // regexText.test(nom)
            // regexText /[a-zA-Z]{3,}/g

            // regex tel /^0[1-9]\d{8}$/

            // regex code postal /[1-9]\d{5}$/
            // regexText.test(ville)
        }

    }
}

