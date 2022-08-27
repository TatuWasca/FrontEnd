import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Educaciones } from 'src/app/model/component-models';

@Injectable({
  providedIn: 'root'
})
export class EducacionService {
  private baseUrl = "http://localhost:8080/Educaciones"

  constructor(private httpCliente: HttpClient) { }

  obtenerListaEdu() : Observable<Educaciones[]>{
    return this.httpCliente.get<Educaciones[]>(`${this.baseUrl}/traer`);
  }

  añadirEdu(Edu:Educaciones) : Observable<any>{
    return this.httpCliente.post(`${this.baseUrl}/crear`, Edu)
  }

  editarEdu(id:number, Edu:Educaciones) : Observable<any>{
    return this.httpCliente.put(`${this.baseUrl}/editar/${id}`, Edu);
  }

  eliminarEdu(id:number) : Observable<any>{
    return this.httpCliente.delete(`${this.baseUrl}/borrar/${id}`);
  }
}

