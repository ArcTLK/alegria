import { Component, OnInit, Input, OnDestroy, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastController, IonReorderGroup } from '@ionic/angular';

@Component({
  selector: 'app-category-edit-modal',
  templateUrl: './category-edit-modal.component.html',
  styleUrls: ['./category-edit-modal.component.scss'],
})
export class CategoryEditModalComponent implements OnInit, OnDestroy {
  // data passed from componentProps
  @Input() private modal: any;
  @Input() public category: any;
  @ViewChild(IonReorderGroup, { static: true }) reorderGroup: IonReorderGroup;

  private userSub: any;
  private userId: any = null;
  public editingEvent: any = null;
  private uneditedCopy: any;
  constructor(
    private angularFirestore: AngularFirestore,
    private angularFireAuth: AngularFireAuth,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    // load user info
    this.userSub = this.angularFireAuth.user.subscribe(user => {
      if (user !== null) {
        this.userId = user.uid;
      }
    });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  async dismiss() {
    await this.modal.dismiss();
  }

  async editName() {
    // check if name is empty
    if (this.category.name === '') {
      const toast = await this.toastController.create({
        message: 'Please enter a category name!',
        duration: 3000
      });
      toast.present();
    }
    else {
      // update category name
      await this.angularFirestore.doc('/categories/' + this.category.id).update({
        name: this.category.name
      });
      const toast = await this.toastController.create({
        message: 'Category name has been updated!',
        duration: 3000
      });
      toast.present();
    }
  }

  async editIcon() {
    // check if icon name is empty
    if (this.category.icon === '') {
      const toast = await this.toastController.create({
        message: 'Please enter an icon name!',
        duration: 3000
      });
      toast.present();
    }
    else {
      // update icon name
      await this.angularFirestore.doc('/categories/' + this.category.id).update({
        icon: this.category.icon
      });
      const toast = await this.toastController.create({
        message: 'Category icon has been updated!',
        duration: 3000
      });
      toast.present();
    }
  }

  async addEvent() {
    this.editingEvent = {
      name: '',
      description: '',
      content: ''
    };
    this.category.events.push(this.editingEvent);
  }

  async saveEvent() {
    this.editingEvent.lastEditedBy = this.userId;
    this.editingEvent.lastEditedOn = Date.now();
    // save to firestore
    await this.angularFirestore.doc('/categories/' + this.category.id).update({
      events: this.category.events
    });
    const toast = await this.toastController.create({
      message: 'Category events have been updated!',
      duration: 3000
    });
    toast.present();
    this.editingEvent = null;
  }

  async editEvent(event: any) {
    this.editingEvent = event;
    this.uneditedCopy = JSON.parse(JSON.stringify(this.category.events));
  }

  async cancelEdit() {
    this.editingEvent = null;
    this.category.events = this.uneditedCopy;
  }

  async deleteEvent(event: any) {
    if (confirm('Are you sure that you want to delete this event?')) {
      this.category.events.splice(this.category.events.findIndex(x => x === event), 1);
      // save to firestore
      await this.angularFirestore.doc('/categories/' + this.category.id).update({
        events: this.category.events
      });
      const toast = await this.toastController.create({
        message: 'Category events have been updated!',
        duration: 3000
      });
      toast.present();
    }
  }
  async doReorder(event: any) {
    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. Update the items variable to the
    // new order of items
    this.category.events = event.detail.complete(this.category.events);
    // save to firestore
    await this.angularFirestore.doc('/categories/' + this.category.id).update({
      events: this.category.events
    });
    const toast = await this.toastController.create({
      message: 'Category events have been reordered!',
      duration: 3000
    });
    toast.present();
  }
}
