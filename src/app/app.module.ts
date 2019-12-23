import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Network } from '@ionic-native/network/ngx';
import { CategoryService, loadCategoriesFactory } from './category.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    NativeStorage,
    GooglePlus,
    Network,
    CategoryService,
    { provide: APP_INITIALIZER, useFactory: loadCategoriesFactory, deps: [CategoryService], multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
