import { NgForm, FormControl, Validators } from '@angular/forms';
import { Product } from './../../../shared/product.model';
import { ProductService } from './../../../shared/product.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-transfer',
  templateUrl: './product-transfer.component.html',
  styleUrls: ['./product-transfer.component.css']
})
export class ProductTransferComponent implements OnInit {

  constructor(private productService : ProductService, private tostr: ToastrService, private router: Router) { 
    // options:string [];
    // if(localStorage.getItem('password')==='org1'){
    //   console.log("Manufacturer-----------------------");
    //   this.options = ["Distributer_1", "Distributer_2", "Distributer_3"];
    // }else if(localStorage.getItem('password')=='org2'){ 
    //   console.log("Manufacturer-----------------------");
    //   this.options = ["Manufacturer", "Retailer_1", "Retailer_2","Retailer_2"];
    // }

    
  }

  
  selected = 'Distributer_1';
  
  //animalControl = new FormControl('', [Validators.required]);
  //options:string []= ["Distributer_1", "Distributer_2", "Distributer_3"];
  if(){

  }

 options = (localStorage.getItem('password') == "org1") ?  this.options = ["Distributer_Pune"] : this.options = ["Manufacturer", "Retailer_Hinjewadi", "Retailer_Aundh","Retailer_Hadapsar"];
 
  ngOnInit() {
    console.log("This is password : " + localStorage.getItem('password'));

  }


  // onSubmit(productForm){
  //   this.productService.isAddProduct=true;
  // }

  onSubmit(productForm: NgForm) {
    this.productService.selectedProduct.status= this.selected +' '+'Queue';
    this.productService.isAddProduct=false;

    // if (localStorage.getItem('owner') === "M") {
      console.log("This is selected item : " + this.selected);
      this.productService.transferProduct(productForm.value, this.selected)
        .subscribe(data => {
          console.log("This is response data" + data);
          this.tostr.success('Added Succcessfully', 'Product Added');
          console.log("Transfered to Distributer by Manufacturer" + JSON.stringify(data));
        }, err => {
          if (err.status == 200) {
            this.tostr.success('Added Succcessfully', 'Product Added');
            console.log("Transfered to Distributer by Manufacturer" + JSON.stringify(err));
            console.log("Trx ID is " + err.error.text);
            //this.listComp.fetchData();
            // this.listComp.ngOnInit();
            this.router.navigate(['/home']);

          }

          // console.log("value of e"+ JSON.stringify(e));
          console.log("error occured" + JSON.stringify(err));
        });
  }




}
