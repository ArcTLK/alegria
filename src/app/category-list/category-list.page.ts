import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.page.html',
  styleUrls: ['./category-list.page.scss'],
})
export class CategoryListPage implements OnInit {
  public categories: any;
  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    // fetch category data
    this.categories = this.categoryService.getCategories();
  }
}
