import { ProductService } from './../../shared/product.service';
import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operator/map';
import { Router } from '@angular/router';
import { ProductListComponent } from '../product-list/product-list.component';
import { MatDatepickerInputEvent } from '@angular/material';

// import { ProductService } from '../shared/product.service'

@Component({
  providers:[ProductListComponent],
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private productService: ProductService, private tostr: ToastrService,
     private router:Router, private listComp : ProductListComponent) { }

     date:any;
  ngOnInit() {
    this.resetForm();
  }

  findProduct(productForm){
      this.router.navigate(['/sample']);
      
  }

  addEventManufacturerDate(type: string, event: MatDatepickerInputEvent<Date>) {
    //this.date=event.value;
    this.productService.selectedProduct.manufacturingDate=event.value;
    console.log("Manufacturer Date :"+ event.value.getMilliseconds.toString())//  .toString())
    console.log("Manufacturer Date :"+  this.productService.selectedProduct.manufacturingDate)
    //this.events.push(`${type}: ${event.value}`);
  }

  addEventExpiryDate(type: string, event: MatDatepickerInputEvent<Date>) {
   // this.date=event.value;
    this.productService.selectedProduct.expiryDate=event.value;
    console.log("Expiry Date :"+ event.value.getMilliseconds.toString())//  .toString())
    console.log("Expiry Date :"+  this.productService.selectedProduct.manufacturingDate)
    //this.events.push(`${type}: ${event.value}`);
  }

  onSubmit(productForm: NgForm) {
    console.log("submit button clicked")
   this.productService.addProduct(productForm.value)
   
   .subscribe(data =>{
      console.log("This is response data"+ data);
      this.tostr.success('Added Succcessfully', 'Product Added');
     // console.log("value of e"+ JSON.stringify(e));
    },err=>{
        if(err.status==200){
          this.tostr.success('Added Succcessfully', 'Product Added');
          console.log("Trx ID is "+ err.error.text);
          //this.listComp.fetchData();
        // this.listComp.ngOnInit();
          this.router.navigate(['/home']);

        }

     // console.log("value of e"+ JSON.stringify(e));
      console.log("error occured"+ JSON.stringify(err));
    });

   

    //This is extra line:1
    //This is second line:2

    // debugger;
    // if (productForm.value.$key == null) {
    //   this.productService.insertProduct(productForm.value);
    //   this.tostr.success('Submitted Succcessfully', 'Product Add');
    // } else {
    //   this.productService.updateProduct(productForm.value);
    //   this.tostr.success('Updated Succcessfully', 'Product Update');
    // }
    this.resetForm(productForm);

  }

  resetForm(productForm?: NgForm) {
    if (productForm != null)
      productForm.reset();
    this.productService.selectedProduct = {
      $key: null,
      ownership: '',
      productName: '',
      manufacturerName: '',
      barcode: '',
      batchNumber: '',
      manufacturingDate: new Date(),
      expiryDate: new Date(),
      quantity: '',
      weight: '',
      temperature: '',
      price: '',
      comment: ''
    }
  }
}
