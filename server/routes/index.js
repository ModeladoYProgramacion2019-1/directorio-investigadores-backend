var express = require('express');
var router = express.Router();

const Direccion = require('../controllers/API/DireccionController').Direccion;
const Administrador = require('../controllers/API/AdministradorController').Administrador;
const Articulo = require('../controllers/API/ArticuloController').Articulo;
const Campo = require('../controllers/API/CampoController').Campo;
const Contacto = require('../controllers/API/ContactoController').Contacto;
const Estudiante = require('../controllers/API/EstudianteController').Estudiante;
const Institucion = require('../controllers/API/InstitucionController').Institucion;
const Investigador = require('../controllers/API/InvestigadorController').Investigador;
const Persona = require('../controllers/API/PersonaController').Persona;
const Rol = require('../controllers/API/RolController').Rol;
const Sede = require('../controllers/API/SedeController').Sede;




/*SEND HOME PAGE*/
router.get('/', function (req, res) {
    console.log("GOT HOMEPAGE REQUEST")
    console.log(__dirname);
    console.log(__dirname.slice(0,__dirname.indexOf("server/routes")));
    res.sendFile(__dirname.slice(0,__dirname.indexOf("server/routes"))+"dist/index.html")
});

/*SERVE STATIC FILES*/
  //CSS
router.get('/css/:fileName', function (req, res) {
    res.sendFile(__dirname.slice(0,__dirname.indexOf("server/routes"))+"dist/css/"+req.params.fileName);
});
  //JS
router.get('/js/:fileName', function (req, res) {
    res.sendFile(__dirname.slice(0,__dirname.indexOf("server/routes"))+"dist/js/"+req.params.fileName);
});
  //IMG
router.get('/img/:fileName', function (req, res) {
    res.sendFile(__dirname.slice(0,__dirname.indexOf("server/routes"))+"dist/img/"+req.params.fileName);
});

/* DIRECCION */
router.get('/API/direccion', Direccion.list);
router.get('/API/direccion/:id', Direccion.show);
router.post('/API/direccion', Direccion.create);
router.patch('/API/direccion/:id', Direccion.update);
router.delete('/API/direccion/:id', Direccion.destroy);

/* ADMINISTRADOR */
router.get('/API/administrador', Administrador.list);
router.get('/API/administrador/:id', Administrador.show);
router.post('/API/administrador', Administrador.create);
router.patch('/API/administrador/:id', Administrador.update);
router.delete('/API/administrador/:id', Administrador.destroy);

/* ARTICULO */
router.get('/API/articulo', Articulo.list);
router.get('/API/articulo/:id', Articulo.show);
router.post('/API/articulo', Articulo.create);
router.patch('/API/articulo/:id', Articulo.update);
router.delete('/API/articulo/:id', Articulo.destroy);

/* CAMPO */
router.get('/API/campo', Campo.list);
router.get('/API/campo/:id', Campo.show);
router.post('/API/campo', Campo.create);
router.patch('/API/campo/:id', Campo.update);
router.delete('/API/campo/:id', Campo.destroy);

/* CONTACTO */
router.get('/API/contacto', Contacto.list);
router.get('/API/contacto/:id', Contacto.show);
router.post('/API/contacto', Contacto.create);
router.patch('/API/contacto/:id', Contacto.update);
router.delete('/API/contacto/:id', Contacto.destroy);

/* ESTUDIANTE */
router.get('/API/estudiante', Estudiante.list);
router.get('/API/estudiante/:id', Estudiante.show);
router.post('/API/estudiante', Estudiante.create);
router.patch('/API/estudiante/:id', Estudiante.update);
router.delete('/API/estudiante/:id', Estudiante.destroy);

/* INSTITUCION */
router.get('/API/institucion', Institucion.list);
router.get('/API/institucion/:id', Institucion.show);
router.post('/API/institucion', Institucion.create);
router.patch('/API/institucion/:id', Institucion.update);
router.delete('/API/institucion/:id', Institucion.destroy);

/* INVESTIGADOR */
router.get('/API/investigador', Investigador.list);
router.get('/API/investigador/:id', Investigador.show);
router.post('/API/investigador', Investigador.create);
router.patch('/API/investigador/:id', Investigador.update);
router.delete('/API/investigador/:id', Investigador.destroy);

/* PERSONA */
router.get('/API/persona', Persona.list);
router.get('/API/persona/:id', Persona.show);
router.post('/API/persona', Persona.create);
router.patch('/API/persona/:id', Persona.update);
router.delete('/API/persona/:id', Persona.destroy);

/* ROL */
router.get('/API/rol', Rol.list);
router.get('/API/rol/:id', Rol.show);
router.post('/API/rol', Rol.create);
router.patch('/API/rol/:id', Rol.update);
router.delete('/API/rol/:id', Rol.destroy);

/* SEDE */
router.get('/API/sede', Sede.list);
router.get('/API/sede/:id', Sede.show);
router.post('/API/sede', Sede.create);
router.patch('/API/sede/:id', Sede.update);
router.delete('/API/sede/:id', Sede.destroy);


module.exports = router;
