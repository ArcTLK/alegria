import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
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
  constructor(
    private angularFireAuth: AngularFireAuth,
    private popoverController: PopoverController
  ) { }
  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
  ngOnInit() {
    // subscribe to user changes
    this.userSubscription = this.angularFireAuth.user.subscribe(user => {
      // prompt login if not logged in
      if (user !== null) {
        //check if user is admin

      }
      else {
        this.isAdmin = false;
        // prompt log in
        this.openLoginPopover();
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
}
