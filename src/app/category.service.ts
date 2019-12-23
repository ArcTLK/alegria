import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Platform } from '@ionic/angular';
import { Network } from '@ionic-native/network/ngx';
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
  constructor(
    private http: HttpClient,
    private nativeStorage: NativeStorage,
    private platform: Platform,
    private network: Network
  ) { }

  async load() {
    try {
      // check if running cordova
      if (this.platform.is('cordova')) {
        // wait for cordova APIs to initialize
        await this.platform.ready();
        // check network
        if (this.network.type !== 'none') {
          // fetch categories from server
          const categories: any = await this.http.get(environment.apiUrl + '/categories').toPromise();
          this.categories.push(...categories);
          // store in native storage
          this.nativeStorage.setItem('categories', categories);
        }
        else {
          //retrieve from native storage
          const categories = await this.nativeStorage.getItem('categories');
          this.categories.push(...categories);
        }
      }
      else {
        // check network
        if (navigator.onLine) {
          // fetch categories from server
          const categories: any = await this.http.get(environment.apiUrl + '/categories').toPromise();
          this.categories.push(...categories);
          // store in localstorage
          localStorage.setItem('categories', JSON.stringify(categories));
        }
        else {
          //retrieve from localstorage
          const categories = localStorage.getItem('categories');
          if (categories != null) {
            this.categories.push(...JSON.parse(categories));
          }
          else {
            // show alert stating no internet
            alert('You need to have an internet connection when you open the app for the first time!');
          }
        }
      }
    }
    catch(error) {
      // handling native errors
      if (error.source === 'Native') {
        if (error.code === 2) {
          // categories not found in native storage
          alert('You need to have an internet connection when you open the app for the first time!');
        }
      }
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
