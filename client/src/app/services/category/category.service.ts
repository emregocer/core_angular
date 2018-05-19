import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Category } from '../../models/category';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

const api_url = environment.api_url;

@Injectable()
export class CategoryService {

  constructor(private http: HttpClient) { }

  getCategory(id : number) : Observable<Category>{
    return this.http.get<Category>(api_url + '/category/' + id.toString())
    .pipe(catchError(this.handleError));
  }

  getCategories(filter = '', sort_prop = 'id', sort_by = 'asc',
    pageIndex = 0, pageSize = 10): Observable<Category[]> {
    const params = new HttpParams()
                .set('filter', filter)
                .set('sort_prop', sort_prop)
                .set('sort_by', sort_by)
                .set('pageIndex', pageIndex.toString())
                .set('pageSize', pageSize.toString())
    return this.http
      .get(api_url + '/category', { params })
      .map(res => {
        let categories = res['data'];
        return categories.map(c => new Category({ id: c.Id, name: c.Name, description: c.Description, isAvailable: c.IsAvailable, isLocked: c.IsLocked }));
      })
      .pipe(catchError(this.handleError));
  }

  createCategory(category : Category) : Observable<Category>{
    return this.http.post<Category>(api_url + '/category', category)
    .pipe(catchError(this.handleError));
  }

  editCategory(id: number, category : Category) : Observable<Category>{
    return this.http.put<Category>(api_url + '/category/' + id.toString(), category)
    .pipe(catchError(this.handleError));
  }

  deleteCategory(id : number){
    return this.http.delete(api_url + '/category/' + id.toString())
    .pipe(catchError(this.handleError));
  }

  getCategoryCount(): Observable<number> {
    return this.http
      .get(api_url + '/category')
      .map(res => {
        return res['count'];
      })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }
}