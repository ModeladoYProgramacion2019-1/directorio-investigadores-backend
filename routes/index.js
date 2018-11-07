var express = require('express');
var router = express.Router();

const Direccion = require('../controllers/API/DireccionController').Direccion;

/* DIRECCION */
router.get('/direccion', Direccion.list);
router.get('/direccion/:id', Direccion.show);
router.post('/direccion', Direccion.create);
router.patch('/direccion/:id', Direccion.update);
router.delete('/direccion/:id', Direccion.destroy);


module.exports = router;
