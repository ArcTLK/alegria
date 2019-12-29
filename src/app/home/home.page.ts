import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  private authSub: any;
  public isLoggedIn: boolean = false;
  constructor(
    private angularFireAuth: AngularFireAuth
  ) { }

  ngOnInit() {
    this.authSub = this.angularFireAuth.user.subscribe(user => {
      this.isLoggedIn = user !== null;
    });
  }
  ngOnDestroy() {
    this.authSub.unsubscribe();
  }

}
