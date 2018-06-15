import { Product } from './../models/product.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';


@Injectable()
export class ProductService {

  constructor(private http: HttpClient) { }
  productList: Product[] = [];
  product = new Product;
  transferingProduct= new Product;
  selectedOption='1';

// Home:192.168.31.165 --// 9.193.16.48
private _url: string ='http://localhost:4000/channels/mgrchannel/chaincodes/mycc?peer=peer1&fcn=query&args=%5B%22XXX%22%5D'//'http://9.193.16.48:4000/channels/mgrchannel/chaincodes/mycc?peer=peer1&fcn=query&args=%5B%22'//// 
private authentication_url: string ='http://localhost:4000/users'//'http://192.168.31.165:4000/users'// ;
getNodeData(): Observable<Product[]> {
  return this.http.get<Product[]>(this._url)
    .catch(this.errorHandler);
}

getSingleProduct(batch) {
  console.log(localStorage.getItem('accessToken'));
  var headerOption = new Headers({ 'Content-Type': 'application/json' });
  return this.http.get(this._url+batch+'%22%5D',{headers: new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('accessToken')})});

}

private _product_list_url:string='http://localhost:4000/channels/mgrchannel/chaincodes/mycc?peer=peer1&fcn=getAllManuFacturerBatches&args=%5B%22'//'http://9.193.16.48:4000/channels/mgrchannel/chaincodes/mycc?peer=peer1&fcn=getAllManuFacturerBatches&args=%5B%22%22%5D'
getAllProductList(owner){
  console.log(localStorage.getItem('accessToken'));

  var headerOption = new Headers({ 'Content-Type': 'application/json' });
  return this.http.get(this._product_list_url+owner+"%22%5D",{headers: new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('accessToken')})});

}

private history_url:string='http://localhost:4000/channels/mgrchannel/chaincodes/mycc?peer=peer1&fcn=getproducthistory&args=%5B%22'
getHistoryForProduct(batchId:string){
  console.log(localStorage.getItem('accessToken'));

  var headerOption = new Headers({ 'Content-Type': 'application/json' });
  return this.http.get(this.history_url+batchId+'%22%5D',{headers: new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('accessToken')})});

}

private add_url:string='http://localhost:4000/channels/mgrchannel/chaincodes/mycc'// 'http://9.193.16.48:4000/channels/mgrchannel/chaincodes/mycc'////'
addProduct(productData){
 var dataarray:any;
 var manudate=(productData.manufacturingDate.getTime()).toString();  
 var expdate=(productData.expiryDate.getTime()).toString();
 dataarray= [productData.batchNumber,productData.barcode,manudate,
  expdate,productData.productName,productData.manufacturerName,productData.ownership,
  productData.quantity,productData.weight,productData.temperature,productData.price,productData.comment, productData.status];

 console.log("This is dataarray"+dataarray);

  // var data = "fcn=" + "addProduct" + "&args=" + dataarray;
  var data={fcn:'addProduct',args:dataarray}
  //'Content-Type': 'application/json',, responseType:'text'
  var reqHeader = new HttpHeaders({  'Authorization':'Bearer '+localStorage.getItem('accessToken') });
  return this.http.post(this.add_url, data, { headers: reqHeader });
}

transferProduct(productData:Product){
  console.log("This is dataarray : "+productData.ownership);
  var dataarray:any;
  var batch=productData.batchNumber;
  var manudate=(productData.manufacturingDate.getTime()).toString();  
  var expdate=(productData.expiryDate.getTime()).toString();
  dataarray= [batch,productData.ownership,productData.status];

  console.log("This is dataarray"+dataarray);

   // var data = "fcn=" + "addProduct" + "&args=" + dataarray;
   var data={fcn:'transferProduct',args:dataarray}
   //'Content-Type': 'application/json',, responseType:'text'
   var reqHeader = new HttpHeaders({  'Authorization':'Bearer '+localStorage.getItem('accessToken') });
   return this.http.post(this.add_url, data, { headers: reqHeader });
}


userAuthentication(username, password) {
  var data = "username=" + username + "&orgName=" + password + "&grant_type=password";
  var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
  console.log("username: " + username + "  " +"password: " + password)
  return this.http.post(this.authentication_url, data, { headers: reqHeader });
}

errorHandler(error: HttpErrorResponse) {
  return Observable.throw(error.message || "Server Error");
}

  getFakeProduct() {
    var numbers = ['A', 'B', 'C'];
    for (var _i = 0; _i < numbers.length; _i++) {
      var num = numbers[_i];

      this.product = new Product;
      this.product.batchNumber = numbers[_i];
      this.product.barcode = numbers[_i];
      this.product.comment = numbers[_i];
      this.product.expiryDate = new Date()// element.expdate;
      this.product.manufacturerName = numbers[_i];
      this.product.manufacturingDate = new Date();// element.manfdate;
      this.product.ownership = numbers[_i];
      this.product.price = numbers[_i];
      this.product.productName = numbers[_i];
      this.product.quantity = numbers[_i];
      this.product.temperature = numbers[_i];
      this.product.weight = numbers[_i];
      this.product.status = numbers[_i];
      this.productList.push(this.product)

    }

    return this.productList;


  }

}
