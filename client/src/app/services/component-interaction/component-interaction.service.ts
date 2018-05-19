import { Injectable } from '@angular/core';
import {Location} from '@angular/common';

@Injectable()
export class ComponentInteractionService {

  public sideNav : any;

  constructor(private location : Location) { }

  goBack(){
    this.location.back();
  }

}
