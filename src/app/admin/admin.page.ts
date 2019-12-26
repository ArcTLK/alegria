import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { PopoverController } from '@ionic/angular';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit, OnDestroy {
  public isAdmin: boolean = false;
  private userSubscription: any;
  private userDataSubscription: any = null;
  public categories: any = [];
  public selectedCategory: any;
  public newCategoryName: string;
  private user: any;
  private categorySubscription: any;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private popoverController: PopoverController,
    private angularFirestore: AngularFirestore
  ) { }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
    if (this.userDataSubscription !== null) {
      this.userDataSubscription.unsubscribe();
    }
    this.categorySubscription.unsubscribe();
  }

  ngOnInit() {
    // subscribe to categories
    this.categorySubscription = this.angularFirestore.collection('categories').snapshotChanges().subscribe(response => {
      this.categories = response.map(value => {
        const document: any = value.payload.doc.data();
        return {
          name: document.name,
          id: value.payload.doc.id
        };
      });
    });
    // subscribe to user changes
    this.userSubscription = this.angularFireAuth.user.subscribe(user => {
      // prompt login if not logged in
      if (user !== null) {
        //check if user is admin
        this.userDataSubscription = this.angularFirestore.doc('/users/' + user.uid).snapshotChanges().subscribe(response => {
          this.user = response.payload.data();
          this.user.id = response.payload.id;
          this.isAdmin = this.user.admin;
        });
      }
      else {
        this.isAdmin = false;
        // prompt log in
        this.openLoginPopover();
        // unsubscribe
        if (this.userDataSubscription !== null) {
          this.userDataSubscription.unsubscribe();
          this.userDataSubscription = null;
        }
      }
    });
  }
  async openLoginPopover() {
    var popover = await this.popoverController.create({
        component: LoginComponent,
        componentProps: { popover }, // passing popover for closing popover from within
        animated: true,
        showBackdrop: true,
        translucent: true
    });
    // display popover
    return await popover.present();
  }

  async addCategory() {
    const categoryData: any = {
      name: this.newCategoryName,
      addedBy: this.user.id,
      addedOn: Date.now()
    };
    this.newCategoryName = '';
    await this.angularFirestore.collection('categories').add(categoryData);
  }

  async deleteCategory() {
    try {
      await this.angularFirestore.doc('/categories/' + this.selectedCategory).delete();
      this.selectedCategory = null;
    }
    catch(error) {
      console.log(error);
    }
  }
}
