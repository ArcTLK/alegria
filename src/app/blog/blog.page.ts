import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.page.html',
  styleUrls: ['./blog.page.scss'],
})
export class BlogPage implements OnInit, OnDestroy {
  private paramMapSub: any;
  public blog: any = {
    title: 'Loading...',
    content: 'Loading'
  };
  constructor(
    private angularFirestore: AngularFirestore,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    // get blog id
    this.paramMapSub = this.route.paramMap.subscribe((paramMap: ParamMap) => {
      // get category data from service
      let blogSub = this.angularFirestore.doc('/blogs/' + paramMap.get('id')).snapshotChanges().subscribe(response => {
        this.blog = response.payload.data();
        // unsubscribe from changes
        blogSub.unsubscribe();
      });
    });
  }
  ngOnDestroy() {
    this.paramMapSub.unsubscribe();
  }

}
