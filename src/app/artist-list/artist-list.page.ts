import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.page.html',
  styleUrls: ['./artist-list.page.scss'],
})
export class ArtistListPage implements OnInit, OnDestroy {
  private blogSub: any;
  public blogPosts: any[];
  constructor(
    private angularFirestore: AngularFirestore,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.blogSub = this.angularFirestore.collection('blogs').ref.where('type', '==', 'artist').orderBy('order').onSnapshot(response => {
      this.blogPosts = response.docs.map(value => {
        const document: any = value.data();
        return {
          title: document.title,
          id: value.id,
          image: document.image,
          description: document.description,
          content: document.content
        };
      });
      // display message
      this.toastController.create({
        message: 'Tap on an announcement to know more',
        duration: 5000
      }).then(toast => toast.present());
    });
  }

  ngOnDestroy() {
    // unsubscribe listener
    this.blogSub();
  }

}
