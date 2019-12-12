import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {
  private category: any;
  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.category = this.categoryService.selectedCategory;
  }

}
