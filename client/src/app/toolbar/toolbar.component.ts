import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ComponentInteractionService } from '../services/component-interaction/component-interaction.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(public componentInteractionService : ComponentInteractionService) {
    
  }

  ngOnInit() {
  }

  toggleSideNav(){
    this.componentInteractionService.sideNav.toggle();
  }

}
