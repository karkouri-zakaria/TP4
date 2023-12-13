import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Product} from "../model/product.model";
import {ProductService} from "../services/product.service";

@Component({
  selector: 'app-new-product',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.css'
})

export class NewProductComponent implements OnInit{

  public productForm!:FormGroup;
  constructor(private formBuilder : FormBuilder, private productService : ProductService) {
  }
  ngOnInit() {
    this.productForm=this.formBuilder.group({
      name : this.formBuilder.control('', [Validators.required]),
      price : this.formBuilder.control(0),
      checked : this.formBuilder.control(false),
    })
  }

  saveProduct() {
    let product:Product = this.productForm.value;
    this.productService.saveProduct(product).subscribe({
      next : (data: any) => {
        alert(JSON.stringify(data));
      }, error : (err: any) => {
        console.log(err);
      }
    });
  }
}
