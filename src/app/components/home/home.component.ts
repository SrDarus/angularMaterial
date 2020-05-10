import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  c(a) { console.log(a) }
  constructor(private fb: FormBuilder) { }



  ngOnInit(): void {
    // this.ctx = this.imgMain.nativeElement.getContext('2d');
  }

}
