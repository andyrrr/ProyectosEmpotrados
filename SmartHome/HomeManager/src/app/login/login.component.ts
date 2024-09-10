import { Component} from '@angular/core';
import { LoginService } from '../Services/login.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  user:string="";
  pass:string="";


  constructor(private cookieService: CookieService, private service:LoginService){}

  ingresar(){
    console.log(this.user)
    console.log(this.pass)


    this.service.getSelectedList("login", this.user + "/" + this.pass).subscribe({
      next:(data) =>{
        this.cookieService.set('auth-token', 'admin', 1);
        this.service.successMessage("¡Bienvenido a tu casa! :)", "/managment")
        console.log(data)
      }, error: (err) =>{
        this.service.errorMessage("No se ha podido verificar tu perfil :(")
        console.log(err)
      }
    })
  }

}
