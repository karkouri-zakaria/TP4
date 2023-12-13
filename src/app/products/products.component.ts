import {Component, OnInit} from '@angular/core';
import {Product} from "../model/product.model";
import {ProductService} from "../services/product.service";
import {FormsModule} from "@angular/forms";
import {NgClass, NgForOf} from "@angular/common";
import {Router} from "@angular/router";
import {AppStateService} from "../services/app-state.service";
import {DashboardComponent} from "../dashboard/dashboard.component";

@Component({
    selector: 'app-products',
    standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgClass,
    DashboardComponent
  ],
    templateUrl: './products.component.html',
    styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

    constructor(private productService: ProductService, private router: Router, public appState: AppStateService) {}

    ngOnInit() {
        this.getProducts();
    }

    getProducts() {
      this.productService.getProducts(this.appState.productsState.keyword, this.appState.productsState.currentPage, this.appState.productsState.pageSize)
        .subscribe({
          next: resp => {
            let products = resp.body as Product[];
            this.productService.getSize(this.appState.productsState.keyword).subscribe(length => {
              let totalProducts = length;
              let totalPages = Math.ceil(this.appState.productsState.totalProducts / this.appState.productsState.pageSize);
              this.appState.productsState = {
                products: products,
                totalProducts: totalProducts,
                totalPages: totalPages,
              };
            });
          },
          error: err => {
            console.log(err);
          }
        });
    }

    handleCheckProduct(product: Product) {
        this.productService.checkProduct(product).subscribe({
            next: () => {
                product.checked = !product.checked;
            }
        });
    }

    handleDelete(product: Product) {
        if (confirm(`Etes vous sûr(e) de vouloir supprimer ${product.id}: ${product.name}?`)) {
            this.productService.deleteProduct(product).subscribe({
                next: () => {
                    //this.appState.productsState.products = this.appState.productsState.products.filter(p => p.id !== product.id);
                  this.getProducts();
                }
            });
        }
    }

    handleEdit(product: Product) {
        this.router.navigateByUrl(`/edit-product/${product.id}`);
    }

    handleGoToPage(page: number) {
        this.appState.productsState.currentPage = page;
        this.getProducts();
    }
}
