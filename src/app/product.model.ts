import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CatalogComponent } from '../catalog/catalog.component';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { ProductService } from './services/product.service';

@NgModule({
  declarations: [
    AppComponent,
    CatalogComponent,
    ProductDetailsComponent
 ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }