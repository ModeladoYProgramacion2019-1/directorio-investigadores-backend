var express = require('express');
var router = express.Router();

const Direccion = require('../controllers/API/DireccionController').Direccion;

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

module.exports = router;
