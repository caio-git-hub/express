const express = require('express');
const router = express.Router();

//importando o controller
const controller = require("../controllers/controller");

/* GET users listing. */
router.get('/', function(req, res, next) {
  const lista = controller.listarTodosUsuarios();
  res.json(lista);
});

module.exports = router;
