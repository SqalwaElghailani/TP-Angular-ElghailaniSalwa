import { Routes } from '@angular/router';
import { CatalogComponent } from "../catalog/catalog.component";
import { ProductDetailsComponent } from "../product-details/product-details.component";
import { SigninComponent } from "../signin/signin.component";
import { HomeComponent } from '../home/home.component';
import { SignupComponent } from '../signup/signup.component';
import { CardComponent } from '../card/card.component';
import { CommendeComponent } from '../commende/commende.component';
import { MesCommandesComponent } from '../mes-commandes/mes-commandes.component';

export const routes: Routes = [
    {path : 'home', component : HomeComponent, title: 'My Catalog products'},
    {path : 'Catalog', component : CatalogComponent, title: 'My Catalog products'},
    {path : 'card', component : CardComponent, title: 'My Card'},
    {path: 'product-details/:id',component: ProductDetailsComponent,title: 'Product details'},
    {path : 'commende/:id', component : CommendeComponent, title: 'My Commende'},
    {path : 'commende', component : CommendeComponent, title: 'My Commende'},
   
    {path : 'signin', component : SigninComponent, title: 'My signin page'},
    {path : 'signup', component : SignupComponent, title: 'My signin page'},
    {path: 'mes-commandes',component: MesCommandesComponent},
    {path : '', redirectTo : '/Catalog', pathMatch : 'full'},
    


];