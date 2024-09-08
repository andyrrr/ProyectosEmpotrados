import { Component} from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  user:string="";
  pass:string="";

  ingresar(){
    console.log(this.user)
    console.log(this.pass)

    if (this.user == "admin" && this.pass=="1234"){
      window.location.href="/managment"
    }
  }

}
