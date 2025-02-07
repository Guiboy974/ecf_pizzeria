// recupère et utilise les données json des pizzas
export async function recuperePizza() {
    const url = 'http://localhost/ECF/src/index.php?action=pizzas';
    const options = {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "Accept" : "application/json"
         }
    }

    try {
        // Envoie une requête fetch à l'URL spécifiée avec les options données
        const response = await fetch(url, options);
        // Vérifie si la réponse est correcte
        if (!response.ok) {
            throw new Error('La réponse du réseau n\'était pas correcte: ' + response.statusText);
        }
        // Convertit la réponse en JSON
        const data = await response.json();
        return data;
    } catch (error) {
        // Affiche une erreur en cas de problème avec l'opération fetch
        console.error('Il y a eu un problème avec votre opération fetch:', error);
    }
}
