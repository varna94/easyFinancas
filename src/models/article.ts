import { Schema } from 'mongoose';
import * as mongoose from 'mongoose';

const despesas: Schema = new Schema({
  conta: { type: String },
  valor: { type: String },
  uid: { type: String },
  descricao: { type: String },
  fixa: { type: String },
  status: { type: String },
  categoria: { type: String },
  dataVencimento: { type: Date }
});

export default mongoose.model('despesas', despesas);
