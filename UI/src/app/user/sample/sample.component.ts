import { Product } from './../../shared/product.model';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ProductService } from './../../shared/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.css']
})
export class SampleComponent implements OnInit {

  constructor(private productService: ProductService,private router: Router) { }

  product: Product;
  ngOnInit() {
    this.product= new Product;
    // this.productService.getSingleProduct().subscribe((data: any) => {
    //   this.product = data;
    //   console.log(JSON.stringify(data));

    // })
  }

  getProduct(productForm: NgForm){
    var batchId= productForm.value.batchNumber;
    this.productService.getSingleProduct(batchId).subscribe((data: any) => {
      this.product = data;
      console.log(JSON.stringify(data));

    })

    this.productService.getAllProductList(localStorage.getItem('owner')).subscribe((dataList: any) => {
      //this.product = data;
      console.log(JSON.stringify(dataList));

    })
    

  }

  resetForm(productForm){
    this.router.navigate(['/home']);
  }

}
