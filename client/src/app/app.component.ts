import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { ComponentInteractionService } from './services/component-interaction/component-interaction.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title : 'app'

  @ViewChild('sideNav') public SideNav;

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(public componentInteractionService : ComponentInteractionService,
              changeDetectorRef: ChangeDetectorRef,
              media: MediaMatcher) 
  {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.componentInteractionService.sideNav = this.SideNav;
  }

  ngOnDestory() : void{
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
