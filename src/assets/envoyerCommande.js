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
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.text(); // Lire la réponse brute en tant que texte
    })
    .then(text => {
        console.log('Raw response:', text); // Affiche la réponse brute
        try {
            const data = JSON.parse(text); // Parser la réponse brute en JSON
            if (data.status !== 'success') {
                throw new Error('Server error: ' + data.message);
            }
            // Supprime le localStorage
            clearLocalStorage();
        } catch (e) {
            console.error('Failed to parse JSON:', e);
            throw new Error('Invalid JSON response');
        }
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });
}
