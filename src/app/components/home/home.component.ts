import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Usuario } from 'src/app/models/usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  usuario:Usuario

  test(a) { console.log(a) }
  constructor(
    private authService: AuthService,
    private router: Router
  ) {  }

  ngOnInit(): void {
    // console.log("usuario", this.usuario)

  }

}
