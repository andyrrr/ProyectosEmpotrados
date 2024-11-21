import { Component, OnDestroy, OnInit } from '@angular/core';
import { Objeto } from '../Interfaces/objeto';
import { EstadoService } from '../Services/estado.service';
import { interval, Subscription, switchMap, timeout } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { FotoService } from '../Services/login.service';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-casa',
  templateUrl: './casa.component.html',
  styleUrl: './casa.component.css'
})
export class CasaComponent implements OnInit, OnDestroy {
  luces:Objeto[] = []
  puertas:Objeto[] = []
  objetos:Objeto[] = []


  selectedFile: File | null = null;
  fileName: string = 'No se ha seleccionado ningún archivo'; // Nombre del archivo

  constructor(private service:EstadoService, private cookieService: CookieService, private fotoService:FotoService, private http: HttpClient){
  }

  ngOnInit(): void {
  }

  // Método para manejar la selección de archivos
  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput?.files?.length) {
      this.selectedFile = fileInput.files[0];
      this.fileName = this.selectedFile.name; // Actualiza el nombre del archivo
    }
  }

  // Método para subir el archivo
  uploadFile(): void {
    if (!this.selectedFile) {
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.http.post('http://192.168.1.111:5000/upload', formData)
      .subscribe({
        next: (response) => {
          console.log('Respuesta del servidor:', response);
          this.service.successMessage("Canción cargada con éxito", "")
        },
        error: (error) => {
          this.service.errorMessage("Error al cargar")
          console.error('Error al subir el archivo:', error);
        }
      });
  }


  ngOnDestroy(): void {
  }

    // Método para restablecer valores
    private resetFileSelection(): void {
      this.selectedFile = null;
      this.fileName = 'No se ha seleccionado ningún archivo';
  
      // Restablece el input de archivo
      const fileInput = document.getElementById('file') as HTMLInputElement;
      if (fileInput) {
        fileInput.value = ''; // Limpia el valor del input
      }
    }


}
