import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CategoryComponent } from './components/category/category.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardCategoryComponent } from './components/dashboard/dashboard-category/dashboard-category.component';
import { CreateCategoryComponent } from './components/dashboard/dashboard-category/create-category/create-category.component';
import { EditCategoryComponent } from './components/dashboard/dashboard-category/edit-category/edit-category.component';

const routes: Routes = [
  { path: 'category', component: CategoryComponent },
  { path: 'dashboard',
    children: [
      { path: '', component: DashboardComponent },
      { path: 'category',
      children: [
        { path: '', component: DashboardCategoryComponent },
        { path: 'create', component: CreateCategoryComponent},
        { path: 'edit/:id', component: EditCategoryComponent}
      ]
      }
    ]
  },
  { path: '', redirectTo: 'category', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }