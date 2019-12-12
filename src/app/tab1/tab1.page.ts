import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  private categories: any;
  constructor(private categoryService: CategoryService, private router: Router) {}

  ngOnInit() {
    // fetch category data
    this.categories = this.categoryService.getCategories();
  }
  private openCategory(category: any) {
    this.categoryService.selectedCategory = category;
    this.router.navigateByUrl('/category');
  }
}
