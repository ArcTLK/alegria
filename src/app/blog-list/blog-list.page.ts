import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.page.html',
  styleUrls: ['./blog-list.page.scss'],
})
export class BlogListPage implements OnInit, OnDestroy {
  private blogSub: any;
  public blogPosts: any[];
  constructor(
    private angularFirestore: AngularFirestore,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.blogSub = this.angularFirestore.collection('blogs').snapshotChanges().subscribe(response => {
      this.blogPosts = response.map(value => {
        const document: any = value.payload.doc.data();
        return {
          title: document.title,
          id: value.payload.doc.id,
          description: document.description
        };
      });
      // display message
      this.toastController.create({
        message: 'Tap on a blog post to know more',
        duration: 5000
      }).then(toast => toast.present());
    });
  }

  ngOnDestroy() {
    this.blogSub.unsubscribe();
  }

}
