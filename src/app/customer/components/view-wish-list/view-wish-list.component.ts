import { Component } from '@angular/core';
import { CustomerService } from '../../service/customer.service';

@Component({
  selector: 'app-view-wish-list',
  templateUrl: './view-wish-list.component.html',
  styleUrls: ['./view-wish-list.component.scss']
})
export class ViewWishListComponent {

  products: any[] = [];

  constructor(
    private customerService: CustomerService) { }

  ngOnInit() {
    this.getWishListByUserId();
  }

  getWishListByUserId() {
    this.customerService.getWishListByUserId().subscribe(res => {
      res.forEach(element => {
        element.processedImg = 'data:imag/jpeg;base64,' + element.returnedImg;
        this.products.push(element);
      });
    })
  }

}
