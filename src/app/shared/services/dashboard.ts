export interface Conta {
  uid: any;
  nome: string;
  banco: string;
  saldo: string;
  tipo: string;
  descricao: boolean;
}
export interface Despesa {
  uid: any;
  valor: string;
  conta: any;
  descricao: string;
  fixa: boolean;
  status: any;
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
