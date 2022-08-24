import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Product } from '../interfaces/product.interface';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() product! :Product;
  //enviar el producto seleccionado al padre
  @Output() addToCartClick = new EventEmitter<Product>();
  constructor() { }

  ngOnInit(): void {
  }

  onclick1():void{
    //console.log('click', this.product);
    this.addToCartClick.emit(this.product);
  }

}
