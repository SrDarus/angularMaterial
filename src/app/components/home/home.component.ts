import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  c(a){console.log(a)}
  constructor(private fb: FormBuilder) { }

  formUsuario: FormGroup
  formUsuario2: FormGroup

  ngOnInit(): void {  
    this.formUsuario = new FormGroup({
      rut: new FormControl('', Validators.required),
      nombre: new FormControl('', Validators.required)
    });

    this.formUsuario2 = this.fb.group({
      rut: ['', Validators.required],
      nombre: ['', Validators.required],
    });


  }

}
