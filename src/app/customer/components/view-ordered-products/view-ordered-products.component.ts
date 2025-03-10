import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../service/customer.service';

@Component({
  selector: 'app-view-ordered-products',
  templateUrl: './view-ordered-products.component.html',
  styleUrls: ['./view-ordered-products.component.scss']
})
export class ViewOrderedProductsComponent {

orderId:any =this.activatedRoute.snapshot.params['orderId'];
orderedProductDetailsList=[];
totalAmount:any;


constructor(
  private activatedRoute : ActivatedRoute,
  private customerService:CustomerService,

){}

ngOnInit(){
  this.getOrderedProductDetailsByUserId();
}

getOrderedProductDetailsByUserId(){
  this.customerService.getOrderedProducts(this.orderId).subscribe(res=>{
    res.productDtoList.forEach(element => {
      element.processedImg='data:image/jpeg;base64,'+ element.byteImg;
      this.orderedProductDetailsList.push(element);
    });
    this.totalAmount=res.orderAmount;
    console.log("Ordered Product Details List:", this.orderedProductDetailsList);
  })
}

}
