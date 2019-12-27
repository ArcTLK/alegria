import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit, OnDestroy {
  public category: any = {
    name: 'Loading Category...'
  };
  private paramMapSubscription: any;
  private categorySubscription: any;
  constructor(
    private angularFirestore: AngularFirestore,
    private route: ActivatedRoute,
    private toastController: ToastController
  ) { }
  ngOnDestroy() {
    this.paramMapSubscription.unsubscribe();
    this.categorySubscription.unsubscribe();
  }
  ngOnInit() {
    // get category id
    this.paramMapSubscription = this.route.paramMap.subscribe((paramMap: ParamMap) => {
      // get category data from service
      this.categorySubscription = this.angularFirestore.doc('/categories/' + paramMap.get('id')).snapshotChanges().subscribe(response => {
        this.category = response.payload.data();
        this.category.id = paramMap.get('id');
        // display message
        this.toastController.create({
          message: 'Tap on an event to know more',
          duration: 5000
        }).then(toast => toast.present());
      });
    });
  }
}
