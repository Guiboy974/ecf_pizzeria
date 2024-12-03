// recupère et utilise les données json des pizzas

// export const pizzas = [];

export async function recuperePizza() {
    try {
        const listJson = await Promise.all([
            fetch('../margherita.json'),
            fetch('../reine.json'),
            fetch('../dijo.json'),
            fetch('../4fromage.json'),
            fetch('../montagnard.json'),
            fetch('../carbonara.json')
        ]);

        const data = await Promise.all(
            listJson.map(res => res.json()),
        );
        return data
    } catch (error) {
        console.log(error);
    }
}
recuperePizza()