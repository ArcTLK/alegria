import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QrHistoryPage } from './qr-history.page';

describe('QrHistoryPage', () => {
  let component: QrHistoryPage;
  let fixture: ComponentFixture<QrHistoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QrHistoryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QrHistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
