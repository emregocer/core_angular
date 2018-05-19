import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgProgressModule, NgProgressInterceptor } from 'ngx-progressbar';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient  } from '@angular/common/http';
import { MediaMatcher } from '@angular/cdk/layout';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { CustomMaterialModule } from './custom-material/custom-material.module';
import { ComponentInteractionService } from './services/component-interaction/component-interaction.service';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { AppRoutingModule } from './/app-routing.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CategoryComponent } from './components/category/category.component';
import { DashboardCategoryComponent } from './components/dashboard/dashboard-category/dashboard-category.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CategoryService } from './services/category/category.service';
import { EditCategoryComponent } from './components/dashboard/dashboard-category/edit-category/edit-category.component';
import { CreateCategoryComponent } from './components/dashboard/dashboard-category/create-category/create-category.component';
import { DeleteConfirmDialogComponent } from './components/shared/delete-confirm-dialog/delete-confirm-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    ProgressBarComponent,
    PageNotFoundComponent,
    CategoryComponent,
    DashboardCategoryComponent,
    DashboardComponent,
    EditCategoryComponent,
    CreateCategoryComponent,
    DeleteConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    CustomMaterialModule,
    NgProgressModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot([])
  ],
  entryComponents: [DeleteConfirmDialogComponent]
  ,
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: NgProgressInterceptor, multi: true },
    ComponentInteractionService,
    MediaMatcher,
    CategoryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }