export interface Conta {
  uid: any;
  nome: string;
  banco: string;
  saldo: string;
  tipo: string;
  descricao: string;
}
export interface Despesa {
  uid: any;
  valor: string;
  conta: string[];
  descricao: string;
  fixa: boolean;
  status: string;
  categoria: string;
  dataVencimento: Date;

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
