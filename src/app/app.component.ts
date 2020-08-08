import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Calculadora';

  operando1: string;
  operando2: string;
  operacion: string;
  resultado: number;

  constructor() {}

  sumar() {
    this.operacion = `${this.operando1} + ${this.operando2}`;
    this.resultado = parseFloat(this.operando1) + parseFloat(this.operando2);
  }
}
