import { infoClient } from './form.js';
import { clearLocalStorage } from './app.js';

// const jsonClient = JSON.stringify(infoClient);

export function envoyerCommande() {
    const url = 'http://localhost/ECF/src/index.php?action=commande';
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(infoClient[0]),
        cache: "no-cache"
    }

    console.log('infoClient:', infoClient);

    fetch(url, options)
    .then(response => {
        return response.text(); // Lire la réponse brute en tant que texte
    })
    .then(text => {
        const data = JSON.parse(text); // Parser la réponse brute en JSON
        if (data.status !== 'success') {
            throw new Error('Server error: ' + data.message);
        }
        // Supprime le localStorage
        clearLocalStorage();
    })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}
