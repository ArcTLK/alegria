import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categories: any = [];
  private _selectedCategory: any;
  constructor(private http: HttpClient) { }

  getCategories() {
    this.http.get(environment.apiUrl + '/categories')
    .subscribe((data: any[]) => {
      this.categories.push(...data);
    }, error => {
      console.log(error);
    });
    return this.categories;
  }

  set selectedCategory(category: any) {
    this._selectedCategory = category;
  }
  get selectedCategory() {
    return this._selectedCategory;
  }

}
