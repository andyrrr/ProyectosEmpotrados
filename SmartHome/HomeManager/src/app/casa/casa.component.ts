import { Component, OnDestroy, OnInit } from '@angular/core';
import { Objeto } from '../Interfaces/objeto';
import { EstadoService } from '../Services/estado.service';
import { interval, Subscription, switchMap, timeout } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { FotoService } from '../Services/login.service';

@Component({
  selector: 'app-casa',
  templateUrl: './casa.component.html',
  styleUrl: './casa.component.css'
})
export class CasaComponent implements OnInit, OnDestroy {
  luces:Objeto[] = []
  puertas:Objeto[] = []
  objetos:Objeto[] = []

  imageUrl: string | undefined;



  private subscription: Subscription = new Subscription;

  constructor(private service:EstadoService, private cookieService: CookieService, private fotoService:FotoService){
    this.sus()

  }

  sus(){
    this.subscription = interval(1000) // Cada 1 segundo
    .pipe(
      switchMap(() => this.service.getSelectedList("getStatus")), 
      timeout(3000) // Timeout después de 5 segundos
    )
    .subscribe(
      (data: Objeto[]) => {
        this.objetos = data
        this.actualizar()
        console.log(data)
      },
      (error) => {
        if (error.name === 'TimeoutError') {
          console.error('Timeout: No se recibió respuesta en el tiempo esperado');
          this.sus()
        } else {
          console.error('Error al obtener el estado:', error);
        }
      }
    );
  }
  ngOnInit(): void {
   
  }


  actualizar() {
    this.objetos.forEach(objeto => {
      if (objeto.tipo === 'puerta') {
        this.actualizarLista(this.puertas, objeto);
      } else if (objeto.tipo === 'luz') {
        this.actualizarLista(this.luces, objeto);
      }
    });
  }


  actualizarLista(lista: Objeto[], nuevoObjeto: Objeto) {
    nuevoObjeto.nombre = nuevoObjeto.nombre.replace(/Puerta/g, '').trim();
    const existente = lista.find(item => item.nombre === nuevoObjeto.nombre);

    if (existente) {
      // Si ya existe, actualizamos su estado
      existente.estado = nuevoObjeto.estado;
    } else {
      // Si no existe, lo agregamos
      lista.push(nuevoObjeto);
    }
  }



  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  cambiarEstado(event: Event, obj: any): void {
    const inputElement = event.target as HTMLInputElement;
    obj.estado = inputElement.checked ? '1' : '0';

    const nombre = obj.nombre.replace(/\s+/g, '').toLowerCase();


    this.service.getSelectedList("putLight", nombre +"/" + obj.estado).pipe(
      timeout(500)  // 500 milisegundos = 0.5 segundos
    ).subscribe({
      next: (data) => {
        console.log("actualizada");
        this.objetos = data
        this.actualizar()
      }, 
      error: (err) => {
        // Revertir el checkbox si ocurre un error o timeout
        inputElement.checked = !inputElement.checked;
        console.log("errorrrrr o timeout");
      }
    });
    //console.log(this.luces)
  }

  cambiarEstadoGeneral(event: Event){
    const obj:Objeto = new Objeto("todas", "0", "luz")
    this.cambiarEstado(event, obj)
  }

  tomarFoto() {
    this.imageUrl = undefined;
  
    setTimeout(() => {
      const timestamp = new Date().getTime(); // Genera un valor único
      this.imageUrl = `${this.fotoService.getRuta()}/getPhoto?${timestamp}`;
    }, 500); // Espera 1 segundo (1000 milisegundos)
  }

  logout() {
    // Eliminar la cookie llamada 'auth-token'
    this.cookieService.delete('auth-token');
    window.location.reload()
  }
}
