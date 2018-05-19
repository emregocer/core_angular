import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {Category} from "../models/category";
import {CategoryService} from '../services/category/category.service';

import {Observable, BehaviorSubject, Subject} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {of} from 'rxjs/observable/of'


export class CategoryDataSource implements DataSource<Category>{

    private categorySubject = new BehaviorSubject<Category[]>([]);
    public countSubject = new BehaviorSubject<number>(0);

    constructor(private categoryService: CategoryService) {}

    connect(collectionViewer: CollectionViewer): Observable<Category[]> {
        return this.categorySubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.categorySubject.complete();
    }

    getCategoryCount(){
        this.categoryService.getCategoryCount()
        .subscribe(n => this.countSubject.next(n));
    }

    getCategories(filter='', sort_prop='id', sort_by='asc', pageIndex=0, pageSize=10){
        this.categoryService.getCategories(filter, sort_prop, sort_by, pageIndex, pageSize)
        .pipe(
            catchError(() => of([]))
        )
        .subscribe(categories => this.categorySubject.next(categories), e => console.log(e), () => this.getCategoryCount());
    }
}