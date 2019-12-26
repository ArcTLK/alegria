import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.page.html',
  styleUrls: ['./category-list.page.scss'],
})
export class CategoryListPage implements OnInit, OnDestroy {
  public categories: any = [];
  private categorySubscriber: any;
  constructor(private angularFirestore: AngularFirestore) {}

  ngOnInit() {
    // fetch category data
    this.categorySubscriber = this.angularFirestore.collection('categories').snapshotChanges().subscribe(response => {
      this.categories = response.map(value => {
        const document: any = value.payload.doc.data();
        return {
          name: document.name,
          id: value.payload.doc.id
        };
      });
    });
  }
  ngOnDestroy() {
    this.categorySubscriber.unsubscribe();
  }
}
