import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { PopoverMenuComponent } from '../popover-menu/popover-menu.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() public title: string;
  public notOnHomePage: Boolean = false;
  constructor(
    private router: Router,
    private popoverController: PopoverController
  ) { }

  ngOnInit() {
    this.notOnHomePage = this.router.url !== '/home';
  }

  async openMenu(event: any) {
    const popover = await this.popoverController.create({
        component: PopoverMenuComponent,
        event: event,
        animated: true,
        showBackdrop: true
    });
    return await popover.present();
  }

}
