import { Component, OnInit } from '@angular/core';
import { AppSettings } from '../../app.config'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  showFiller = false
  btnMenu: boolean

  readonly sidenavConfig = AppSettings.SIDENAV_CONFIG
  // sidenavConfig: object = {
  //   mode: {
  //     side: "side",
  //     over: "over",
  //     push: "push"
  //   }
  // }

  constructor() { }

  ngOnInit(): void {
  }

}
