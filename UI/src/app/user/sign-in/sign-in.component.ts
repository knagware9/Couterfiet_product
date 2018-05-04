import { HttpErrorResponse } from '@angular/common/http';
import { ProductService } from './../../shared/product.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  isLoginError = true;
  constructor(private router: Router, private productSrevice: ProductService) { }

  ngOnInit() {
  }

  public errorMessage;

  public product = [];
  OnSubmit(userName, password) {
    // this.productSrevice.getNodeData()
    // .subscribe(data => this.product = data,
    //           error => this.errorMessage=error);
    //           console.log("This is error: "+ this.errorMessage)



    this.productSrevice.userAuthentication(userName, password).subscribe((data: any) => {
      localStorage.setItem('accessToken', data.token)

      // this.router.navigate(['/sample'])
      //console.log("This is Token: "+ data.)
      console.log("This is Token: " + data.token)
      if (password == "org1") {
        
        localStorage.setItem('owner', userName)
        localStorage.setItem('password', password)
        console.log("This is password: "+ password)
        console.log("This is password ---Storage : "+ localStorage.getItem('password'))
        this.router.navigate(['/home']);
        // this.router.navigate(['/manufacturer'])
      }
      else if (password == "org2") {
        localStorage.setItem('password', password)
        localStorage.setItem('owner', userName)
        console.log("User Name is : " + userName)
        console.log("This is password: "+ password)
        console.log("This is password ---Storage : "+ localStorage.getItem('password'))
        this.router.navigate(['/distributer'])
      } else if (password == "org3") {
        localStorage.setItem('owner',userName)
        localStorage.setItem('password', password)
        console.log("This is password: "+ password)
        console.log("This is password ---Storage : "+ localStorage.getItem('password'))
        this.router.navigate(['/retailer'])
      } else {
        localStorage.setItem('owner', userName)
        localStorage.setItem('password', password)
        console.log("This is password***********: "+ password)
        console.log("This is password ---Storage : "+ localStorage.getItem('password'))
        this.router.navigate(['/home']);
      }
    },
      (err: HttpErrorResponse) => {
        this.isLoginError = true;

      });







  }
}
