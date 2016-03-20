//#########################################
//########    COSTAT SERVIDOR    ##########
//#########################################

var express = require('express');
var router = express.Router();

//Creem pila missatges (array de JSONs) que s'omplira amb cada petició client i el msg enviat
//Creem un 1er missatge de benvinguda
var data = new Date();
var data_login = data.toISOString().substr(0, 10);
var pila_missatges = [{"Nick": "<h4>Login ok", "Data": data_login, "Message": "Respecta les normes del chat!</h4>"}];

router.get('/', function (req, res) {

    console.log('request to ----> /server from AJAX');
    var json_query = req.query.msg;                       //recuperem el JSON en format text de la query
    var json_obj = JSON.parse(json_query);               //convertim de text a JSON obj
    if (json_obj.Nick && json_obj.Message) {
        pila_missatges.push(json_obj);                  //Afegim el missatge JSON obj a la pila si no está vuit
        console.log('json_obj: ' + json_obj);
    } else {
        console.log("Ajax ha enviat missatge sense cos ===> no s'afageix a la pila!")
    }
    console.log(pila_missatges);
    console.log('json_query: ' + json_query);

    //Pasem la pila missatges a text i la enviem d volta al client-AJAX

    var pila = JSON.stringify(pila_missatges);
    console.log('pila: ' + pila + '\nNum missatges: ' + pila.length);
    res.send(pila);

});

module.exports = router;