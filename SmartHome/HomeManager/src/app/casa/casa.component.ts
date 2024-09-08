import { Component, OnDestroy, OnInit } from '@angular/core';
import { Objeto } from '../Interfaces/objeto';
import { EstadoService } from '../Services/estado.service';
import { interval, Subscription, switchMap, timeout } from 'rxjs';

@Component({
  selector: 'app-casa',
  templateUrl: './casa.component.html',
  styleUrl: './casa.component.css'
})
export class CasaComponent implements OnInit, OnDestroy {
  luces:Objeto[] = []
  puertas:Objeto[] = []
  objetos:Objeto[] = []

  foto:Objeto = new Objeto("test", "test", "foto");


  private subscription: Subscription = new Subscription;

  constructor(private service:EstadoService){
    //this.dummy2()
    //this.actualizar()
    this.sus()

  }

  sus(){
    this.subscription = interval(1000) // Cada 1 segundo
    .pipe(
      switchMap(() => this.service.getSelectedList("getStatus")), 
      timeout(1000) // Timeout después de 5 segundos
    )
    .subscribe(
      (data: Objeto[]) => {
        this.objetos = data
        this.actualizar()
      },
      (error) => {
        if (error.name === 'TimeoutError') {
          console.error('Timeout: No se recibió respuesta en el tiempo esperado');
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

  dummy(){
    this.luces.push(new Objeto("Cuarto 1", "1", "luz"))
    this.luces.push(new Objeto("Cuarto 2", "0", "luz"))
    this.luces.push(new Objeto("Sala", "0" , "luz"))
    this.luces.push(new Objeto("Comedor", "1", "luz"))
    this.luces.push(new Objeto("Cocina", "1", "luz")) 


    this.puertas.push(new Objeto("Cuarto 1", "1", "puerta"))
    this.puertas.push(new Objeto("Cuarto 2", "0" , "puerta"))
    this.puertas.push(new Objeto("Delantera", "1", "puerta"))
    this.puertas.push(new Objeto("Trasera", "0", "puerta"))
  }


  dummy2(){
    this.objetos.push(new Objeto("Cuarto 1", "1", "luz"))
    this.objetos.push(new Objeto("Cuarto 2", "0", "luz"))
    this.objetos.push(new Objeto("Sala", "0" , "luz"))
    this.objetos.push(new Objeto("Comedor", "1", "luz"))
    this.objetos.push(new Objeto("Cocina", "1", "luz")) 


    this.objetos.push(new Objeto("Cuarto 1", "1", "puerta"))
    this.objetos.push(new Objeto("Cuarto 2", "0" , "puerta"))
    this.objetos.push(new Objeto("Delantera", "1", "puerta"))
    this.objetos.push(new Objeto("Trasera", "0", "puerta"))
  }


  cambiarEstado(event: Event, obj: any): void {
    const inputElement = event.target as HTMLInputElement;
    obj.estado = inputElement.checked ? '1' : '0';

    this.service.update("putLight", obj).pipe(
      timeout(500)  // 500 milisegundos = 0.5 segundos
    ).subscribe({
      next: (data) => {
        console.log("actualizada");
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
}
