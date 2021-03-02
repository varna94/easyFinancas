const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const despesas = new Schema({
    valor: { type: String },
    uid: { type: String },
    descricao: { type: String },
    fixa: { type: String },
    status: { type: String },
    categoria: { type: String },
    dataVencimento: { type: String }
});

module.exports = mongoose.model('despesas', despesas);