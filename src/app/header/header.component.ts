import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() public title: string;
  public notOnHomePage: Boolean = false;
  constructor(private router: Router) { }

  ngOnInit() {
    this.notOnHomePage = this.router.url !== '/';
  }

}
