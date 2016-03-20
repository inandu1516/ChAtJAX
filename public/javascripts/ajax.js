//#########################################
//########    COSTAT CLIENT     ###########
//#########################################

var user_input = document.getElementById('user_input');
var msg_input = document.getElementById('msg_input');
var message = document.getElementById('message');
var div_list = document.getElementById('div_list');

//Al cargar la pagina mostrem els missatges existens a la pila del servidor
function start() {
    CridaAJAX("", "");
    timer = setInterval(CridaAJAX, 3000, "", "");
}
//----------------------------------------------------------------------------------//

//A Client Event Occurs On Enter KeyUp
msg_input.onkeyup = function(e) {
    if (e.keyCode === 13) {
        //Recollim les dades de la view
        var user = '<b>'+user_input.value+'</b>';
        var msg = msg_input.value;
        msg_input.value = "";       //guardem valor input i el resetejem a la vista

        CridaAJAX(user, msg);
    }
};
//----------------------------------------------------------------------------------//

function createXmlHttpRequestObject() {
    var xmlHttp;
    if(window.ActiveXObject){   //for IE
        try {
            xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");  //return true if so
        }catch(e){
            xmlHttp = false;
        }
    }else{      //for all others
        try {
            xmlHttp = new XMLHttpRequest();  //return true if so
            return xmlHttp;
        }catch(e){
            xmlHttp = false;
        }
    }
    if(!xmlHttp)
        alert("cant create xmlHttp object!. Change browser or update!");
}
//----------------------------------------------------------------------------------//

//Funció on AJAX envía asincronament el missatge al servidor en format JSON (text) a través de la url del metode GET.
//AJAX rep del servidor la pila de missatges en format JSON (text) i la mostra al client manipulant el DOM.
function CridaAJAX(user, msg) {
    console.log('msg porta msg: ' + msg);

    var xhttp = createXmlHttpRequestObject();

    //La data en que l'usuari envía el missatge al servido
    var d = new Date();
    var date = '<i>'+d.hhmmss()+'</i>';

    //convertim JSON obj a text pla per enviarlo per url
    var json_msg = JSON.stringify( {Nick:user, Data:date, Message:msg} );
    console.log('json_msg: ' + json_msg);

    //enviem el JSON en format text a través de la url
    var url = '/server?msg=' + json_msg;
    console.log('url: ' + url);

    //Specifies the type of request
    xhttp.open("GET", url, true);

    //Sends the request to the server (used for GET)
    xhttp.send();

    //AJAX HA REBUT EL RECURS DEL SERVIDOR I AKI EL PROCESSEM DE NOU AL CLIENT
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            var serverResponse = xhttp.responseText;
            var json_obj = JSON.parse(serverResponse);  // <------ Convertim el text rebut a JSON object !
            console.log('json_obj: ' + json_obj);
            console.log('Num missatges: ' + json_obj.length);

            var num_missatges = json_obj.length;

            var ul_list = document.getElementById('ul_list');
            div_list.removeChild(ul_list);

            var ul = document.createElement('ul');
            ul.id = 'ul_list';

            for(var i=0; i<num_missatges; i++){
                var li = document.createElement('li');
                div_list.appendChild(ul);
                ul.appendChild(li);

                var message =
                    json_obj[i].Nick +
                    ' [' + json_obj[i].Data +
                    ']: ' + json_obj[i].Message;

                li.innerHTML = message;
            }
        }
    };
}

//---------Date format----------//
Date.prototype.hhmmss = function() {
    var hh = this.getHours() < 10 ? "0" + this.getHours() : this.getHours();
    var min = this.getMinutes() < 10 ? "0" + this.getMinutes() : this.getMinutes();
    var ss = this.getSeconds() < 10 ? "0" + this.getSeconds() : this.getSeconds();
    return hh+':'+min+':'+ss;
};