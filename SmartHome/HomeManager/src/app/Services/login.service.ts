import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ConexionService } from './conexion.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends ConexionService<string> {
  constructor(
    protected override httpClient: HttpClient,
    protected override route: Router
  ) {
    super(httpClient, route);
  }
}