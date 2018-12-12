var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var Models  = require('./models');
var bodyParser = require('body-parser')
var cors = require('cors')
var cron = require("node-cron")
const Op = Models.Sequelize.Op;
var Email = require("./controllers/Core/EmailController").Email;
const fs = require('fs');
var jwt = require("jsonwebtoken");

var routes = require('./routes/index');

var app = express();

var debug = require('debug')('directorio-backend:server');
var http = require('http');

/**
 * Get port from environment and store in Express.
 */
var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
Models.sequelize.sync().then(function(){
    server.listen(port);
    server.on('error', onError);
    server.on('listening', onListening);
});

var corsOptions = {
  origin: process.env.frontend_url,
  methods: "GET,PUT,POST,PATCH,DELETE",
  optionsSuccessStatus: 200
}

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(cors(corsOptions))

app.set('view engine', 'ejs');
app.use('/', routes);
app.use(logger('dev'));
app.use(cookieParser());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


//app.use(express.static(path.join(__dirname, '/dist')));

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

/** 
 * Cron schedule to send verification reminders and delete non-registered users after set time
 **/
cron.schedule("1 * * * * *", function(){
    Models.sequelize.query("SELECT Contacto.correo_personal, Persona.nombre, Persona.apellido, Persona.persona_id FROM Contacto "
        + " INNER JOIN Persona ON Contacto.contacto_id=Persona.contacto_id "
        + " AND is_verified = false AND "
        + " DATEDIFF(NOW(), Persona.createdAt) >= "+ parseInt(Number(process.env.verification_time)- 2) 
        + " AND DATEDIFF(NOW(), Persona.createdAt) < " + process.env.verification_time + ";").spread((results, metadata) => {
        console.log(results);
        // Sending deletion notice to unregistered users
        for(i = 0; i < results.length; i++){
            var tokenData = {
                nombre: results[i].nombre,
                apellido: results[i].apellido,
                correo_personal: results[i].correo_personal,
                persona_id: results[i].persona_id
            }
            var jwtToken = jwt.sign(tokenData, process.env.JWT_key, {expiresIn: "2 days"});
            Email.sendAccountDeletion(tokenData, results[i].correo_personal, jwtToken);
        }
    });
    Models.sequelize.query("SELECT contacto_id FROM Persona WHERE datediff(createdAt, now())>= "
    + process.env.verification_time + " AND is_verified = false;").spread((results, metadata) => {
        for(i = 0; i < results.length; i++){
            Models.sequelize.query("delete from Persona where contacto_id = " + 
            results[i].contacto_id+ ";").spread((results, metadata) =>{});
            Models.sequelize.query("delete from Contacto where contacto_id = " + 
            results[i].contacto_id+ ";").spread((results, metadata) =>{});
        }
    });
});
module.exports = app;
