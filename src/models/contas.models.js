const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contas = new Schema({
    uid: { type: String },
    nome: { type: String },
    banco: { type: String },
    saldo: { type: String },
    tipo: { type: String },
    descricao: { type: String }
})


module.exports = mongoose.model('conta', contas);