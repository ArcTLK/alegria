import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-popover-menu',
  templateUrl: './popover-menu.component.html',
  styleUrls: ['./popover-menu.component.scss'],
})
export class PopoverMenuComponent implements OnInit, OnDestroy {
  private popover: PopoverController;
  public isAdmin: boolean = false;
  private authSub: any = null;
  private userSub: any = null;
  constructor(
    private navParams: NavParams,
    public router: Router,
    private angularFireAuth: AngularFireAuth,
    private angularFirestore: AngularFirestore
  ) {
    this.popover = this.navParams.get('popover');
  }
  ngOnDestroy() {
    if (this.authSub !== null) this.authSub.unsubscribe();
    if (this.userSub !== null) this.userSub.unsubscribe();
  }
  ngOnInit() {
    this.authSub = this.angularFireAuth.user.subscribe(user => {
      if (user !== null) {
        this.userSub = this.angularFirestore.doc('users/' + user.uid).snapshotChanges().subscribe(response => {
          this.isAdmin = response.payload.get('admin');
        });
      }
    });
  }

  async navigate(page: string) {
    // close popover
    await this.popover.dismiss();
    // navigate
    this.router.navigateByUrl(page);
  }

  signOut() {
    // close popover
    this.popover.dismiss();
    // sign out
    this.angularFireAuth.auth.signOut();
    // redirect to home
    this.router.navigateByUrl('/home');
  }

}
