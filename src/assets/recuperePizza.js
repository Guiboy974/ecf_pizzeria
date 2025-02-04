// recupère et utilise les données json des pizzas
export async function recuperePizza() {
    const url = 'http://localhost/ECF/src/index.php?action=pizzas';
    const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" }
    }

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error('La réponse du réseau n\'était pas correcte: ' + response.statusText);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Il y a eu un problème avec votre opération fetch:', error);
    }
}
