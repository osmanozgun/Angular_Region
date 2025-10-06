import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './components/product/product.component';
import { CategoryComponent } from './components/category/category.component';
import { ProductAddComponent } from './components/product-add/product-add.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SepetComponent } from './components/sepet/sepet.component';

const routes: Routes = [
  {path:"", pathMatch:"full", component:LoginComponent},
  {path:"products", component:ProductComponent},
  {path:"products/manager", component:ProductAddComponent},
  {path:"products/category/:categoryId", component:ProductComponent},
  {path:"login", component:LoginComponent},
  {path:"register", component:RegisterComponent},
  {path:"sepet", component:SepetComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
