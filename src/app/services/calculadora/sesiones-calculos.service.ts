import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class SesionesCalculosService {

  constructor( private http: HttpClient ) { }


  guardarSesion( sesion: any ) {

    console.log('guardando sesion');

    return this.http.post(`${ base_url }/sesiones`, sesion );

  }



  getSesiones() {

    console.log('obteniendo sesiones de calculo');

    return this.http.get(`${ base_url }/sesiones`);

  }


}
