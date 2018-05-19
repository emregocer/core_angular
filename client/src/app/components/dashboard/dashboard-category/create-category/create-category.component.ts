import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComponentInteractionService} from '../../../../services/component-interaction/component-interaction.service'
import { CategoryService} from '../../../../services/category/category.service';
import { Category } from '../../../../models/category';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {

  category : Category = new Category();

  constructor(public fb: FormBuilder,
              private router: Router,
              public ciService : ComponentInteractionService,
              private categoryService : CategoryService) {
  }

  ngOnInit() {
  }

  onSubmit(){
    this.categoryService.createCategory(this.category)
    .subscribe(
      c => console.log(JSON.stringify(c)),
      e => console.log(e), 
      () => this.router.navigate(['/dashboard/category'])
    );
  }
}