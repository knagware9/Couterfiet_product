import { Router } from '@angular/router';
import { Batch } from './../../shared/batch.model';
import { ProductService } from './../../shared/product.service';
import { ToastrService } from 'ngx-toastr';
import { Product } from './../../shared/product.model';
import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent implements OnInit {

  productList = [];
  productList2 = [];
  product = new Product;
  i: any = 0;
  //selected = 'Distributer_1';
  owner:string='';

  //selected = 'option2';
  public options = [
    {"id": 1, "name": "Distributer_1"},
    {"id": 2, "name": "Distributer_2"},
    {"id": 3, "name": "Distributer_3"}
  ]
  selected = this.options[1].id;

  // options = ["Distributer_1", "Distributer_2", "Distributer_3"];
  // optionSelected: any;
  constructor(private productService: ProductService, private tostr: ToastrService, private router: Router, private cd: ChangeDetectorRef) {
    this.productList = []
    this.productList2 = [];
  }


  ngOnInit() {
    // debugger;
    this.fetchData();

  }

  fetchData() {
    this.productList2 = [];


    // this.productList2 === [];
    this.owner=localStorage.getItem('owner');
    this.productService.getAllProductList(this.owner)
      .subscribe(data => {
        console.log("This is response data: data................................." + JSON.stringify(data));
        console.log("Owner is : "+ localStorage.getItem('owner') )
        //localStorage.setItem('owner', userName) 
        console.log("User Name is : "+ localStorage.getItem('owner'))
        // if (localStorage.getItem('owner') === "Manufacturer") {
          data.Batches.forEach(element => {
            // if (element.ownership == "Manufacturer") {
              this.product = new Product;
              this.product.batchNumber = element.batchid;
              this.product.barcode = element.barcode;
              this.product.comment = element.comment;
              this.product.expiryDate = new Date(parseInt(element.expdate))// element.expdate;
              this.product.manufacturerName = element.manname;
              this.product.manufacturingDate = new Date(parseInt(element.manfdate));// element.manfdate;
              this.product.ownership = element.ownership;
              this.product.price = element.price;
              this.product.productName = element.prdname;
              this.product.quantity = element.quantity;
              this.product.temperature = element.temp;
              this.product.weight = element.weight

              this.productList2.push(this.product)
            // }
          })
        // } 
        // else if (localStorage.getItem('owner') === "Distributer_1" ) {
        //   data.Batches.forEach(element => {
        //     if (element.ownership == "Distributer_1") {
        //       this.product = new Product;
        //       this.product.batchNumber = element.batchid;
        //       this.product.barcode = element.barcode;
        //       this.product.comment = element.comment;
        //       this.product.expiryDate = new Date(parseInt(element.expdate))// element.expdate;
        //       this.product.manufacturerName = element.manname;
        //       this.product.manufacturingDate = new Date(parseInt(element.manfdate));// element.manfdate;
        //       this.product.ownership = element.ownership;
        //       this.product.price = element.price;
        //       this.product.productName = element.prdname;
        //       this.product.quantity = element.quantity;
        //       this.product.temperature = element.temp;
        //       this.product.weight = element.weight

        //       this.productList2.push(this.product)
        //     }
        //   })
          
        // } else if (localStorage.getItem('owner') === "R") {
        //   data.Batches.forEach(element => {
        //     if (element.ownership == "Retailer") {
        //       this.product = new Product;
        //       this.product.batchNumber = element.batchid;
        //       this.product.barcode = element.barcode;
        //       this.product.comment = element.comment;
        //       this.product.expiryDate = new Date(parseInt(element.expdate))// element.expdate;
        //       this.product.manufacturerName = element.manname;
        //       this.product.manufacturingDate = new Date(parseInt(element.manfdate));// element.manfdate;
        //       this.product.ownership = element.ownership;
        //       this.product.price = element.price;
        //       this.product.productName = element.prdname;
        //       this.product.quantity = element.quantity;
        //       this.product.temperature = element.temp;
        //       this.product.weight = element.weight

        //       this.productList2.push(this.product)
        //     }
        //   })
        // } else  if (localStorage.getItem('owner') === "Distributer_2" ) {
        //   console.log("Owner is "+ "Distributer_2" )
        //   data.Batches.forEach(element => {
        //     if (element.ownership == "Distributer_2") {
        //       console.log("coming inside"+ element.ownership )
        //       this.product = new Product;
        //       this.product.batchNumber = element.batchid;
        //       this.product.barcode = element.barcode;
        //       this.product.comment = element.comment;
        //       this.product.expiryDate = new Date(parseInt(element.expdate))// element.expdate;
        //       this.product.manufacturerName = element.manname;
        //       this.product.manufacturingDate = new Date(parseInt(element.manfdate));// element.manfdate;
        //       this.product.ownership = element.ownership;
        //       this.product.price = element.price;
        //       this.product.productName = element.prdname;
        //       this.product.quantity = element.quantity;
        //       this.product.temperature = element.temp;
        //       this.product.weight = element.weight

        //       this.productList2.push(this.product)
        //     }
        //   })
          
        // }  else if (localStorage.getItem('owner') === "Distributer_3" ) {
        //   data.Batches.forEach(element => {
        //     if (element.ownership == "Distributer_3") {
        //       this.product = new Product;
        //       this.product.batchNumber = element.batchid;
        //       this.product.barcode = element.barcode;
        //       this.product.comment = element.comment;
        //       this.product.expiryDate = new Date(parseInt(element.expdate))// element.expdate;
        //       this.product.manufacturerName = element.manname;
        //       this.product.manufacturingDate = new Date(parseInt(element.manfdate));// element.manfdate;
        //       this.product.ownership = element.ownership;
        //       this.product.price = element.price;
        //       this.product.productName = element.prdname;
        //       this.product.quantity = element.quantity;
        //       this.product.temperature = element.temp;
        //       this.product.weight = element.weight

        //       this.productList2.push(this.product)
        //     }
        //   })
          
        // }


        // this.cd.detectChanges();
        //   this.cd.markForCheck();
        this.productList = this.productList2 as Product[];
        this.cd.markForCheck();
        //this.sam= data;
        console.log("This is list==========================" + JSON.stringify(this.productList));
        console.log("This is response data==========================" + JSON.stringify(data));
        //console.log("This is response data"+ JSON.stringify(productList));

        // this.tostr.success('Added Succcessfully', 'Product Added');
        // console.log("value of e"+ JSON.stringify(e));
      }, err => {
        if (err.status == 200) {
          this.tostr.success('Added Succcessfully', 'Product Added');
          console.log("Trx ID is " + err.error.text);
        }

        // console.log("value of e"+ JSON.stringify(e));
        console.log("error occured" + JSON.stringify(err));
      });


    // var x = this.productService.getData();
    // x.snapshotChanges().subscribe(item => {
    //   this.productList = [];
    //   item.forEach(element => {
    //     var y = element.payload.toJSON();
    //     y["$key"] = element.key;

    //     this.productList.push(y as Product);
    //   });
    // });
  }

  onEdit(pro: Product) {
    // pro.manufacturingDate= new Date(parseInt(pro.manufacturingDate))
    this.productService.selectedProduct = Object.assign({}, pro);
  }

  onDelete(key: string) {
    // if (confirm('Are you sure to delete this record ?') == true) {
    //   this.productService.deleteProduct(key);
    //   this.tostr.warning("Deleted Successfully", "Employee register");
    // }
  }

  onTransfer(pro: Product, key: string) {

    this.productService.isAddProduct=false;
    this.productService.selectedProduct = Object.assign({}, pro);

    // if (localStorage.getItem('owner') === "Manufacturer") {
    //   console.log("This is selected item : " + this.selected);
    //   this.productService.transferProduct(pro, this.selected)
    //     .subscribe(data => {
    //       console.log("This is response data" + data);
    //       this.tostr.success('Added Succcessfully', 'Product Added');
    //       console.log("Transfered to Distributer by Manufacturer" + JSON.stringify(data));
    //     }, err => {
    //       if (err.status == 200) {
    //         this.tostr.success('Added Succcessfully', 'Product Added');
    //         console.log("Transfered to Distributer by Manufacturer" + JSON.stringify(err));
    //         console.log("Trx ID is " + err.error.text);
    //         //this.listComp.fetchData();
    //         // this.listComp.ngOnInit();
    //         this.router.navigate(['/home']);

    //       }

    //       // console.log("value of e"+ JSON.stringify(e));
    //       console.log("error occured" + JSON.stringify(err));
    //     });

    // } else if (localStorage.getItem('owner') === "D") {
    //   this.productService.transferProduct(pro, "Retailer")
    //     .subscribe(data => {
    //       console.log("This is response data" + data);
    //       this.tostr.success('Added Succcessfully', 'Product Added');
    //       // console.log("value of e"+ JSON.stringify(e));
    //     }, err => {
    //       if (err.status == 200) {
    //         this.tostr.success('Added Succcessfully', 'Product Added');
    //         console.log("Trx ID is " + err.error.text);
    //         //this.listComp.fetchData();
    //         // this.listComp.ngOnInit();
    //         this.router.navigate(['/home']);

    //       }

    //       // console.log("value of e"+ JSON.stringify(e));
    //       console.log("error occured" + JSON.stringify(err));
    //     });

    // } else if (localStorage.getItem('owner') === "R") {
    //   this.productService.transferProduct(pro, "R")
    //     .subscribe(data => {
    //       console.log("This is response data" + data);
    //       this.tostr.success('Added Succcessfully', 'Product Added');
    //       // console.log("value of e"+ JSON.stringify(e));
    //     }, err => {
    //       if (err.status == 200) {
    //         this.tostr.success('Added Succcessfully', 'Product Added');
    //         console.log("Trx ID is " + err.error.text);
    //         //this.listComp.fetchData();
    //         // this.listComp.ngOnInit();
    //         this.router.navigate(['/home']);

    //       }

    //       // console.log("value of e"+ JSON.stringify(e));
    //       console.log("error occured" + JSON.stringify(err));
    //     });

    // }


    // if (confirm('Are you sure to transfer this record ?') == true) {
    //   this.productService.transferProduct(pro, "distributer");
    //   this.productService.deleteProduct(key);

    //   this.tostr.warning("Transfered Successfully", "Product Transfer");
    // }
  }


}
