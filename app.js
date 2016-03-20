var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var index = require('./routes/index');
//var users = require('./routes/users');
//var chat = require('./routes/chat');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', index);
//app.use('/users', users);
//app.use('/chat', chat);

app.get('/download', function(req, res){
    var file = __dirname + '/public/images/horaris.png';
    res.download(file); // Set disposition and send it.
});

app.get('/user', function (req, res) {
    var Nick = req.query.Nickname;
    console.log('Nick = ' + Nick);
    res.render('chat', { title: 'Users', message: 'Hello there', nick: Nick  });
});


//Creem pila missatges (array de JSONs) que s'omplira amb cada petició client i el msg enviat
//Creem un 1er missatge de benvinguda
var data = new Date();
var data_login = data.toISOString().substr(0,10);
var pila_missatges = [ {"Nick":"<h4>Login ok","Data":data_login,"Message":"Respecta les normes del chat!</h4>"} ];


//The res object represents the HTTP response that an Express app sends when it gets an HTTP request.
//URL client AJAX -> Servidor
app.get('/server', function(req, res) {
    console.log('request to ----> /server from AJAX');
    var json_query = req.query.msg;                       //recuperem el JSON en format text de la query
    var json_obj = JSON.parse(json_query);               //convertim de text a JSON obj
    if(json_obj.Nick && json_obj.Message){
        pila_missatges.push(json_obj);                  //Afegim el missatge JSON obj a la pila si no está vuit
        console.log('json_obj: ' + json_obj);
    }else{
        console.log("Ajax ha enviat missatge sense cos ===> no s'afageix a la pila!")
    }
    console.log(pila_missatges);
    console.log('json_query: ' + json_query);

    //Pasem la pila missatges a text i la enviem d volta al client-AJAX

    var pila = JSON.stringify(pila_missatges);
    console.log('pila: ' + pila + '\nNum missatges: ' + pila.length);
    res.send(pila);
});

//----------- Error Handlers --------------//

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
