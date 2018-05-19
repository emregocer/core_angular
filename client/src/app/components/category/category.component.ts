import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categories : Category[] = [];

  constructor(private categoryService : CategoryService) { }

  ngOnInit() {
    this.categoryService.getCategories('', 'id', 'asc', 0, 12).subscribe(categories => this.categories = categories);
  }
}