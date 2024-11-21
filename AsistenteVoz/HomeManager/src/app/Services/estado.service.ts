import { Injectable } from '@angular/core';
import { ConexionService } from './conexion.service';
import { ObjetoInterface } from '../Interfaces/objeto';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EstadoService extends ConexionService<ObjetoInterface> {
  constructor(
    protected override httpClient: HttpClient,
    protected override route: Router
  ) {
    super(httpClient, route);
  }
}