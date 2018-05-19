import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, OnDestroy, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Category } from '../../../models/category';
import { CategoryService } from '../../../services/category/category.service';
import { SelectionModel } from '@angular/cdk/collections';
import { CategoryDataSource } from '../../../data-sources/category-data-source';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { MatPaginator } from '@angular/material'
import { MatSort } from '@angular/material';
import { Subject } from 'rxjs'; 
import { debounceTime, distinctUntilChanged, startWith, tap, delay } from 'rxjs/operators';
import { merge } from "rxjs/observable/merge";
import { fromEvent } from 'rxjs/observable/fromEvent';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DeleteConfirmDialogComponent } from '../../shared/delete-confirm-dialog/delete-confirm-dialog.component';

@Component({
  selector: 'app-dashboard-category',
  templateUrl: './dashboard-category.component.html',
  styleUrls: ['./dashboard-category.component.css']
})
export class DashboardCategoryComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;

  deleteDialogRef: MatDialogRef<DeleteConfirmDialogComponent>;

  categoryDS: CategoryDataSource;
  category_count: number = 0;
  columns = ['id', 'name', 'isAvailable', 'isLocked', 'description', 'actions'];

  constructor(
    private categoryService: CategoryService, 
    public router: Router, 
    private dialog: MatDialog,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.categoryDS = new CategoryDataSource(this.categoryService);
    this.categoryDS.getCategories('', 'id', 'asc', 0, 10);
    this.categoryDS.countSubject.subscribe(c => this.category_count = c);
    this.sort.direction = "asc";
  }

  ngAfterViewInit() {
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadCategories();
        })
      )
      .subscribe();

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadCategories())
      )
      .subscribe();
  }

  loadCategories() {
    this.categoryDS.getCategories(
      this.input.nativeElement.value,
      this.sort.active,
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize
    )
  }

  deleteCategory(id: number) {
    this.categoryService.deleteCategory(id)
      .subscribe(null, e => console.log(e), () => this.loadCategories());
  }

  editCategory(row) {
    this.router.navigate(['/dashboard/category/edit', row.id]);
  }

  onRowClicked(row) {
    
  }

  openDeleteCategoryDialog(row) {
    this.deleteDialogRef = this.dialog.open(DeleteConfirmDialogComponent, { data: { category_name: row.name } });
    this.deleteDialogRef.afterClosed()
      .subscribe(
        res => {
          if (res === true){
            this.deleteCategory(row.id);
          }
        }
      );
  }
}