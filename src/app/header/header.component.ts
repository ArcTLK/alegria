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
  // used to determine display of back button
  public notOnHomePage: Boolean = false;
  constructor(
    private router: Router,
    private popoverController: PopoverController
  ) { }

  ngOnInit() {
    // do not display back button when on home page
    this.notOnHomePage = this.router.url !== '/home';
  }

  async openMenu(event: any) {
    // create popover
    const popover = await this.popoverController.create({
        component: PopoverMenuComponent,
        event: event,
        animated: true,
        showBackdrop: true,
        translucent: true
    });
    // add event listener to close
    popover.addEventListener('click', async () => popover.dismiss());
    // display popover
    return await popover.present();
  }

}
