import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';
import { CategoryCleanService } from '../../services/categoryclean.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit  {

categories :  Category[] = []; 
currentcategory:Category | null = null;
constructor(private categoryService:CategoryService,
  private categoryCleanService:CategoryCleanService
) {}

  ngOnInit(): void {
    this.getCategories();
    this.categoryCleanService.clearCategory$.subscribe(() => {
    this.clean(); // currentcategory = null
  });
  }
  getCategories()
  {
    this.categoryService.getCategories().subscribe(response =>{
      this.categories = response;
      
    })
  }
  setCurrentCategory(category:Category) {
    this.currentcategory = category;
  }
  getCurrentCategory(category:Category)
  {
    if(category == this.currentcategory)
    {
      return "list-group-item active"
    }
    else return "list-group-item"
  }
  getAllCategory()
  {
    if(!this.currentcategory)
    {
      return "list-group-item active"
    }
    else return "list-group-item"
  }
  clean()
  {
    this.currentcategory = null;
  }
}
