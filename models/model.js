//importando o banco de dados
const bancoDeDados = require("../bancoDeDados.json");


//retorna a lista de usuarios
exports.listarTodosUsuarios = () => bancoDeDados.usuarios;