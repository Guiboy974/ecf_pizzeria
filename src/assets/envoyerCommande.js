import {infoClient} from './form.js';
import {commandePizza, clearLocalStorage } from './app.js';

const jsonClient = JSON.stringify(infoClient);
const jsonPizza = JSON.stringify(commandePizza);

$.ajax( {
    type: "POST",
    url: "http://localhost/ECF/src/controller/CommandeController.php",
    data: {data : jsonString},
    cache : false,

    success: function(){
        //supprime le localStorage
        clearLocalStorage();
    }
})