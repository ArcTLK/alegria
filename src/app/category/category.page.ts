import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CategoryService, Category } from '../category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit, OnDestroy {
  public category: Category;
  private paramMapSubscription: any;
  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
  ngOnDestroy() {
    this.paramMapSubscription.unsubscribe();
  }
  ngOnInit() {
    // get category id
    this.paramMapSubscription = this.route.paramMap.subscribe((paramMap: ParamMap) => {
      const id = parseInt(paramMap.get('id'));
      // get category data from service
      this.category = this.categoryService.getCategoryByIndex(id);
    });
  }

}
