import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  private authSub: any;
  public isLoggedIn: boolean = false;
  constructor(
    private angularFireAuth: AngularFireAuth,
    private splashScreen: SplashScreen
  ) { }

  ngOnInit() {
    this.authSub = this.angularFireAuth.user.subscribe(user => {
      this.isLoggedIn = user !== null;
      // intentionally added delay to properly load stuff
      window.setTimeout(() => this.splashScreen.hide(), 100);
    });
  }
  ngOnDestroy() {
    this.authSub.unsubscribe();
  }

}
