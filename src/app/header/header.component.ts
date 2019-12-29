import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController, Platform } from '@ionic/angular';
import { PopoverMenuComponent } from '../popover-menu/popover-menu.component';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input() public title: string;
  public hasCordovaSupport: boolean;
  // used to determine display of back button
  public notOnHomePage: boolean = false;
  private userSub: any;
  public isLoggedIn: boolean = false;
  constructor(
    private router: Router,
    private popoverController: PopoverController,
    private platform: Platform,
    private angularFireAuth: AngularFireAuth
  ) { }

  ngOnInit() {
    // do not display back button when on home page
    this.notOnHomePage = this.router.url !== '/home';
    // to display QR code button
    this.hasCordovaSupport = this.platform.is('cordova');
    this.userSub = this.angularFireAuth.user.subscribe(user => {
      this.isLoggedIn = user !== null;
    });
  }
  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  async openMenu(event: any) {
    // create popover
    var popover = await this.popoverController.create({
        component: PopoverMenuComponent,
        componentProps: { popover }, // passing popover for closing popover from within
        event: event,
        animated: true,
        showBackdrop: true,
        translucent: true
    });
    // display popover
    return await popover.present();
  }

}
