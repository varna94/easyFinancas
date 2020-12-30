import { AbstractControl } from '../../node_modules/@angular/forms';

export class Validacoes {
  static validaEmail(controle: AbstractControl) {
    const email = controle.value;
    const regex = new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$");

    if (!regex.test(email)) {

      console.log(regex.test(email));

    } else {
      console.log(regex.test(email));

    }
    return { emailValido: true };
  }
}
