import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ArtistListPage } from './artist-list.page';

describe('ArtistListPage', () => {
  let component: ArtistListPage;
  let fixture: ComponentFixture<ArtistListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtistListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ArtistListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
