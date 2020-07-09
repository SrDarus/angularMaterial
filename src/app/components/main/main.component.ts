import { Component, OnInit } from '@angular/core';
import { AppSettings } from '../../app.config'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  readonly url = AppSettings.API_ENDPOINT_LOCAL;


  showFiller = false
  btnMenu: boolean

  readonly sidenavConfig = AppSettings.SIDENAV_CONFIG
  
  constructor() { }

  ngOnInit(): void {
  }

}
