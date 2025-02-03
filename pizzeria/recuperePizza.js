// recupère et utilise les données json des pizzas
export async function recuperePizza() {
    try {
        const response = await fetch('http://localhost/ECF/pizzeria/test.php');
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}
