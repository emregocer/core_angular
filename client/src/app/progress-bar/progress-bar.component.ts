import { Component, OnInit } from '@angular/core';
import { NgProgress } from 'ngx-progressbar';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent implements OnInit {

  constructor(public progress: NgProgress) { }

  ngOnInit() {
  }

}
