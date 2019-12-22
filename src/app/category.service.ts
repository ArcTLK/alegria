import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

export type Event = {
  name: string,
  description: string
};

export type Category = {
  name: string,
  events: Event[]
};

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categories: Category[] = [];
  constructor(private http: HttpClient) { }

  async load() {
    // fetch categories from server
    try {
      const categories: any = await this.http.get(environment.apiUrl + '/categories').toPromise();
      this.categories.push(...categories);
    }
    catch(error) {
      console.log(error);
    }
  }

  getCategories() {
    return this.categories;
  }

  getCategoryByIndex(index: number) {
    return this.categories[index];
  }

  getNumberOfCategories() {
    return this.categories.length;
  }
}

export function loadCategoriesFactory(categoryService: CategoryService) {
  return () => categoryService.load();
}
