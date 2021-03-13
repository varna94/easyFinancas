import { CurrencyPipe } from '@angular/common';

export interface Conta {
  uid: any;
  nome: String;
  banco: String;
  saldo: string;
  tipo: String;
  descricao: String;
}
export interface Despesa {
  uid: any;
  valor: string;
  conta: String[];
  descricao: String;
  fixa: Boolean;
  status: String;
  categoria: String;
  dataVencimento: Date;
  repetir: Number;
  periodo: String;
}
export interface Recurso {
  uid: any;
  saldo: String;
  conta: String;
  descricao: String;
  recebido: Boolean;
  tipo: String;
  receitaFixa: Boolean;
  repetir: Number;
  periodo: String;
  dataRecebimento: Date;
}
export interface Cartao {
  uid: any;
  nome: String;
  bandeira: String;
  banco: String;
  limite: String;
  dataFechamentoFatura: Date;
  dataVencimentoFatura: Date;
  descricao: String;
}
export interface User {
  displayName: any;
  email: any;
  emailVerified: any;
  photoURL: any;
  uid: any;
}

export interface dataGe {

}
