import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export abstract class ConexionService<T> {

  constructor(protected httpClient: HttpClient, protected route: Router) {
  }




  getRuta() {
    return "http://192.168.1.154:5000";
  }

  getSelectedList(atributo: string, atributo2?: string) {
    if (atributo2){
      return this.httpClient.get<T[]>(this.getRuta() + "/" + atributo + "/" + atributo2);
    }
    return this.httpClient.get<T[]>(this.getRuta() + "/" + atributo);
  }

  get(id: string | number, id2?: string|number) {
    
    if (id2){
      id = id + "/" + id2
    }
    console.log(this.getRuta()+ "/" + id)
    return this.httpClient.get<T>(this.getRuta() + "/" + id);
  }

  add(resource: T, id?: string|number): Observable<T> {
    if (id){
      return this.httpClient.post<T>(this.getRuta() + "/" + id, resource);
    }
    return this.httpClient.post<T>(this.getRuta(), resource);
  }
  
  onNuevoParam(resource:T, ruta:string): Observable<T> {
    return this.httpClient.post<T>(this.getRuta() + "/" + ruta, resource);
  }

  update(id:number | string, resource: T): Observable<T> {
    console.log(this.getRuta()+ "/" + id)
    return this.httpClient.put<T>(this.getRuta()+ "/" + id, resource);
  }
  delete(id: string | number) {
    return this.httpClient.delete<T[]>(this.getRuta() + "/" + id);
  }


  errorMessage(mensaje:string){
    Swal.fire({
      title: "Ha habido un problema!",
      text: mensaje,
      icon: "error",
    });
  }
  successMessage(mensaje:string, url:string){
    Swal.fire({
      title: mensaje,
      icon: "success",
      didClose: () => {
        window.location.href = url;
      }
    });
  }
}