import { Batch } from './batch.model';
import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import { Product } from './product.model';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';

@Injectable()
export class ProductService {
  //productList= [];
  productList: AngularFireList<any>;
  productList2: AngularFireList<any>;
  productList3: AngularFireList<any>;
  selectedProduct: Product = new Product();
  isAddProduct=true;
  constructor(private firebase: AngularFireDatabase, private http: HttpClient) {

  }

  // getData() {
  //   this.productList = this.firebase.list('products');
  //   return this.productList;
  // }

  // Home:192.168.31.165
  private _url: string ='http://9.193.16.48:4000/channels/mgrchannel/chaincodes/mycc?peer=peer1&fcn=query&args=%5B%22XXX%22%5D'//'http://9.193.16.48:4000/channels/mgrchannel/chaincodes/mycc?peer=peer1&fcn=query&args=%5B%22'//// 
  private authentication_url: string ='http://9.193.16.48:4000/users'//'http://192.168.31.165:4000/users'// ;
  getNodeData(): Observable<Product[]> {
    return this.http.get<Product[]>(this._url)
      .catch(this.errorHandler);
  }

  getSingleProduct(batch) {
    console.log(localStorage.getItem('accessToken'));
    var headerOption = new Headers({ 'Content-Type': 'application/json' });
    return this.http.get(this._url+batch+'%22%5D',{headers: new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('accessToken')})});

  }

  private _product_list_url:string='http://9.193.16.48:4000/channels/mgrchannel/chaincodes/mycc?peer=peer1&fcn=getAllManuFacturerBatches&args=%5B%22'//'http://9.193.16.48:4000/channels/mgrchannel/chaincodes/mycc?peer=peer1&fcn=getAllManuFacturerBatches&args=%5B%22%22%5D'
  getAllProductList(owner){
    console.log(localStorage.getItem('accessToken'));
  
    var headerOption = new Headers({ 'Content-Type': 'application/json' });
    return this.http.get(this._product_list_url+owner+"%22%5D",{headers: new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('accessToken')})});

  }

  private add_url:string='http://9.193.16.48:4000/channels/mgrchannel/chaincodes/mycc'// 'http://9.193.16.48:4000/channels/mgrchannel/chaincodes/mycc'////'
  addProduct(productData){
   var dataarray:any;
   var manudate=(this.selectedProduct.manufacturingDate.getTime()).toString();  
   var expdate=(this.selectedProduct.expiryDate.getTime()).toString();
   dataarray= [productData.batchNumber,productData.barcode,manudate,
    expdate,productData.productName,productData.manufacturerName,productData.ownership,
    productData.quantity,productData.weight,productData.temperature,productData.price,productData.comment];

   console.log("This is dataarray"+dataarray);

    // var data = "fcn=" + "addProduct" + "&args=" + dataarray;
    var data={fcn:'addProduct',args:dataarray}
    //'Content-Type': 'application/json',, responseType:'text'
    var reqHeader = new HttpHeaders({  'Authorization':'Bearer '+localStorage.getItem('accessToken') });
    return this.http.post(this.add_url, data, { headers: reqHeader });
  }

  transferProduct(productData:Product, type){
    console.log("This is dataarray : "+type);
    var dataarray:any;
    var batch=productData.batchNumber;
    var manudate=(this.selectedProduct.manufacturingDate.getTime()).toString();  
    var expdate=(this.selectedProduct.expiryDate.getTime()).toString();
    dataarray= [batch,type];
 
    console.log("This is dataarray"+dataarray);
 
     // var data = "fcn=" + "addProduct" + "&args=" + dataarray;
     var data={fcn:'transferProduct',args:dataarray}
     //'Content-Type': 'application/json',, responseType:'text'
     var reqHeader = new HttpHeaders({  'Authorization':'Bearer '+localStorage.getItem('accessToken') });
     return this.http.post(this.add_url, data, { headers: reqHeader });
  }

  //This is line:1 
  
  userAuthentication(username, password) {
    var data = "username=" + username + "&orgName=" + password + "&grant_type=password";
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    console.log("username: " + username + "  " +"password: " + password)
    return this.http.post(this.authentication_url, data, { headers: reqHeader });
  }

  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || "Server Error");
  }

  getDistributerData() {
    this.productList2 = this.firebase.list('Distributer');
    return this.productList2;
  }
  getRetailerData() {
    this.productList3 = this.firebase.list('Retailer');
    return this.productList3;
  }

  // insertProduct(product: Product) {
  //   this.productList.push({
  //     batchNumber: product.batchNumber,
  //     barcode: product.barcode,
  //     manufacturingDate: product.manufacturingDate,
  //     expiryDate: product.expiryDate,
  //     productName: product.productName,
  //     manufacturerName: product.manufacturerName,
  //     quantity: product.quantity,
  //     weight: product.weight,
  //     temperature: product.temperature,
  //     price: product.price,
  //     ownership: product.ownership,
  //     comment: product.comment

  //   });
  // }

  updateProduct(product: Product) {
    this.firebase.list('products').update(product.$key,
      {
        batchNumber: product.batchNumber,
        barcode: product.barcode,
        manufacturingDate: product.manufacturingDate,
        expiryDate: product.expiryDate,
        manufacturerName: product.manufacturerName,
        productName: product.productName,
        quantity: product.quantity,
        weight: product.weight,
        temperature: product.temperature,
        price: product.price,
        ownership: product.ownership,
        comment: product.comment
      });
  }

  // deleteProduct($key: string) {
  //   this.productList.remove($key);
  // }

  deleteDistributerProduct($key: string) {
    this.productList2.remove($key);
  }

  // transferProduct(product: Product, type: string) {
  //   if (type == "distributer") {
  //     this.productList2 = this.firebase.list('Distributer');
  //     this.productList2.push({
  //       batchNumber: product.batchNumber,
  //       barcode: product.barcode,
  //       manufacturingDate: product.manufacturingDate,
  //       expiryDate: product.expiryDate,
  //       productName: product.productName,
  //       manufacturerName: product.manufacturerName,
  //       quantity: product.quantity,
  //       weight: product.weight,
  //       temperature: product.temperature,
  //       price: product.price,
  //       ownership: product.ownership,
  //       comment: product.comment

  //     });
  //   } else if (type == "retailer") {
  //     this.productList3 = this.firebase.list('Retailer');
  //     this.productList3.push({
  //       batchNumber: product.batchNumber,
  //       barcode: product.barcode,
  //       manufacturingDate: product.manufacturingDate,
  //       expiryDate: product.expiryDate,
  //       productName: product.productName,
  //       manufacturerName: product.manufacturerName,
  //       quantity: product.quantity,
  //       weight: product.weight,
  //       temperature: product.temperature,
  //       price: product.price,
  //       ownership: product.ownership,
  //       comment: product.comment
  //     });
  //   }
  // }
}
