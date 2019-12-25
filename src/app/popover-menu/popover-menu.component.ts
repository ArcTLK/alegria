import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-popover-menu',
  templateUrl: './popover-menu.component.html',
  styleUrls: ['./popover-menu.component.scss'],
})
export class PopoverMenuComponent implements OnInit, OnDestroy {
  private popover: PopoverController;
  public signedIn: boolean;
  private userSubscription: any;
  constructor(
    private navParams: NavParams,
    private router: Router,
    private angularFireAuth: AngularFireAuth
  ) {
    this.popover = this.navParams.get('popover');
  }
  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
  ngOnInit() {
    // subscribe to user changes
    this.userSubscription = this.angularFireAuth.user.subscribe(user => {
      // if user is null, not logged in
      this.signedIn = user !== null;
    });
  }

  navigate(page: string) {
    // close popover
    this.popover.dismiss();
    // navigate
    this.router.navigateByUrl(page);
  }

  signOut() {
    // close popover
    this.popover.dismiss();
    // sign out
    this.angularFireAuth.auth.signOut();
  }

}
