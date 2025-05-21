import { Routes } from '@angular/router';
import { CatalogComponent } from "../catalog/catalog.component";
import { ProductDetailsComponent } from "../product-details/product-details.component";
import { SigninComponent } from "../signin/signin.component";
import { HomeComponent } from '../home/home.component';

export const routes: Routes = [
    {path : 'home', component : HomeComponent, title: 'My Catalog products'},
    {path : 'Catalog', component : CatalogComponent, title: 'My Catalog products'},
    {path: 'product-details/:id',
  component: ProductDetailsComponent,
  title: 'Product details'
},

   
    {path : 'signin', component : SigninComponent, title: 'My signin page'},
    {path : '', redirectTo : '/home', pathMatch : 'full'},
    


];