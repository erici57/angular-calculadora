import { Component } from '@angular/core';
import { evaluate } from 'mathjs';
import { SesionesCalculosService } from '../../services/calculadora/sesiones-calculos.service';
import { Sesion } from '../../models/sesion.model';

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.css']
})
export class CalculadoraComponent{

  sesion = {
    operandos: '',
    operacion: '',
  };

  sesiones: Sesion[] = [];
  history = false;

  result = '';

  buttons: string[] = ['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '.', '0', '=', '+', '(', ')', 'AC', 'CE'];

  prevValue = '';
  curValue = ''; 

  constructor( private sesionesService: SesionesCalculosService ) { }

  addToExpression( value: string ) {

    if ( this.result != '' ) {
      this.prevValue = this.curValue;
      this.curValue = value;
    }

    if ( value == 'AC' ) {
      this.result = '';
    } else if ( value == 'CE' ) {
      this.result = this.prevValue != '=' ? this.result.slice(0, -1) : this.result;
    } else if ( value == '=' ) {

      if (this.result == ''){
        return true;
      }

      this.sesion.operandos = this.result;

      this.result = evaluate(this.result);

      this.guardarSesion(this.sesion.operandos);

    } else {
      this.result += value;
    }

 }


 guardarSesion( operandos: string ) {

  this.sesion.operacion = operandos + '' + '=' + this.result;
  this.sesion.operandos = operandos;

  this.sesionesService.guardarSesion(this.sesion)
          .subscribe( resp => {
            console.log('sesion saved');
          }, (err) => console.warn(err) );

 }



 getSesiones() {

   this.history = true;

   this.sesionesService.getSesiones().subscribe( (resp: any) => {

     const cont = resp.sesiones.length;

     if ( cont == 0 ) {
      return true;
    }

    // dejo en el visor de la calculadora la ultima operacion
     this.result = resp.sesiones[cont - 1].operandos;

     this.sesiones = resp.sesiones;

   });
 }


 ocultarsSesiones() {
   this.history = false;
 }


 seleccionarOperacion( index: number ) {

   console.log('operacion seleccionada');
   this.result = this.sesiones[index].operandos;
 }


}
