import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ComponentInteractionService } from '../../../../services/component-interaction/component-interaction.service'
import { CategoryService } from '../../../../services/category/category.service';
import { Category } from '../../../../models/category';
import { Router, Params } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {

  category: Category = new Category();
  category_id: number;
  formOptions: FormGroup;
  options = [
    { value: '', label: 'Choose a value' },
    { value: false, label: 'No' },
    { value: true, label: 'Yes' },
  ];

  constructor(public fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    public ciService: ComponentInteractionService,
    private categoryService: CategoryService) {

    this.formOptions = fb.group({
      hideRequired: false,
      floatLabel: 'auto',
    });

  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => this.category_id = params['id']);
    this.getCategory();
  }

  getCategory() {
    this.categoryService.getCategory(this.category_id)
      .subscribe(c => this.category = c, null, () => console.log(this.category));
  }

  onSubmit() {
    this.categoryService.editCategory(this.category_id, this.category)
      .subscribe(null, e => console.log(e), () => this.router.navigate(['/dashboard/category']));
  }
}