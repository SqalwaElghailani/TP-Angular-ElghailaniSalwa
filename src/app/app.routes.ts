import { RouterModule, Routes } from '@angular/router';
import { CatalogComponent } from "../catalog/catalog.component";
import { ProductDetailsComponent } from "../product-details/product-details.component";
import { SigninComponent } from "../signin/signin.component";
import { HomeComponent } from '../home/home.component';
import { SignupComponent } from '../signup/signup.component';
import { CardComponent } from '../card/card.component';
import { CommendeComponent } from '../commende/commende.component';
import { MesCommandesComponent } from '../mes-commandes/mes-commandes.component';
import { AuthGuard } from '../guards/auth.guard';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    {path : 'home', component : HomeComponent, title: 'My Catalog products'},
    {path : 'Catalog', component : CatalogComponent, title: 'My Catalog products'},
    {path : 'card', component : CardComponent, title: 'My Card',canActivate: [AuthGuard]},
    {path: 'product-details/:id',component: ProductDetailsComponent,title: 'Product details',canActivate: [AuthGuard]},
    {path : 'commende/:id', component : CommendeComponent, title: 'My Commende',canActivate: [AuthGuard]},
    {path : 'commende', component : CommendeComponent, title: 'My Commende',canActivate: [AuthGuard]},
   
    {path : 'signin', component : SigninComponent, title: 'My signin page'},
    {path : 'signup', component : SignupComponent, title: 'My signin page'},
    {path: 'mes-commandes',component: MesCommandesComponent, canActivate: [AuthGuard]},
    {path : '', redirectTo : '/Catalog', pathMatch : 'full'},
    


];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}