import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CustomerService } from '../../service/customer.service';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.scss']
})
export class PlaceOrderComponent {

  orderForm!:FormGroup;

  constructor(
    private customerService: CustomerService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private router:Router,
    private dialog: MatDialog,
  ){}

ngOnInit(){
this.orderForm=this.fb.group({
  address:[null,[Validators.required]],
  orderDescription:[null],
  })
}

placeOrder(){
  this.customerService.placeOrder(this.orderForm.value).subscribe(res=>{
    if(res.id!=null){
      this.snackBar.open('Order Placed Succesfully', 'Close',{duration:5000});
      this.router.navigateByUrl('/customer/my-orders');
      this.closeForm();
    }else{
      this.snackBar.open('Something Went wrong  ', 'Close',{duration:5000});
    }
  })
}

closeForm(){
  this.dialog.closeAll();
}

  }

