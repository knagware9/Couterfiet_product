import { Product } from './../../shared/product.model';
import { ProductService } from './../../shared/product.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {


  productList = [];
  productList2 = [];
  product = new Product;
  constructor(private productService:ProductService, private tostr:ToastrService) { }

  ngOnInit() {
    this.fetchHistory();

  }

fetchHistory(){
  this.productService.getHistoryForProduct(this.productService.productHistory)
  .subscribe(data => {
    console.log("This is response data: data................................." + JSON.stringify(data));
    // console.log("Owner is : "+ localStorage.getItem('owner') )
    // console.log("User Name is : "+ localStorage.getItem('owner'))
      data.forEach(element => {
          this.product = new Product;
          this.product.batchNumber = element.Value.batchid;
          this.product.barcode = element.Value.barcode;
          this.product.comment = element.Value.comment;
          this.product.expiryDate = new Date(parseInt(element.Value.expdate))// element.expdate;
          this.product.manufacturerName = element.Value.manname;
          this.product.manufacturingDate = new Date(parseInt(element.Value.manfdate));// element.manfdate;
          this.product.ownership = element.Value.ownership;
          this.product.price = element.Value.price;
          this.product.productName = element.Value.prdname;
          this.product.quantity = element.Value.quantity;
          this.product.temperature = element.Value.temp;
          this.product.weight = element.Value.weight
          this.product.status= element.Value.status

          this.productList2.push(this.product)
      })

    this.productList = this.productList2 as Product[];
    //this.cd.markForCheck();
    //this.sam= data;
    console.log("This is list==========================" + JSON.stringify(this.productList));
    console.log("This is response data==========================" + JSON.stringify(data));
    //console.log("This is response data"+ JSON.stringify(productList));

    // this.tostr.success('Added Succcessfully', 'Product Added');
    // console.log("value of e"+ JSON.stringify(e));
  }, err => {
    if (err.status == 200) {
      this.tostr.success('Product Fetched Successfully', '');
      console.log("Trx ID is " + err.error.text);
    }

    // console.log("value of e"+ JSON.stringify(e));
    console.log("error occured" + JSON.stringify(err));
  });

}
}
