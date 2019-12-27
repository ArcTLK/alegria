import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit, OnDestroy {
  private paramMapSub: any;
  public event: any = {
    name: 'Loading...',
    content: 'Loading'
  };
  constructor(
    private angularFirestore: AngularFirestore,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    // get category id and event index
    this.paramMapSub = this.route.paramMap.subscribe((paramMap: ParamMap) => {
      // get category data from service
      let categorySub = this.angularFirestore.doc('/categories/' + paramMap.get('id')).snapshotChanges().subscribe(response => {
        const data: any = response.payload.data();
        // get event from event list
        this.event = data.events[paramMap.get('index')];
        // unsubscribe from changes
        categorySub.unsubscribe();
      });
    });
  }
  ngOnDestroy() {
    this.paramMapSub.unsubscribe();
  }

}
