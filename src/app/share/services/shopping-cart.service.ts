import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { Product } from "src/app/pages/products/interfaces/product.interface";

@Injectable(
    {providedIn:'root'}
)

export class ShoppingCartService{
//array de productos vacio
products: Product[]=[];

//observables
private cartSubject =new Subject<Product[]>();
private totalSubject =new Subject<number>();
private quantitySubject =new Subject<number>();

//devolver los observables a quien desea consumirlo
get totalAction$():Observable<number>{
    return this.totalSubject.asObservable(); 
}
get quantityAction$():Observable<number>{
    return this.quantitySubject.asObservable();
} 
get cartAction$():Observable<Product[]>{
    return this.cartSubject.asObservable();
}    
//este metodo permitira acceder a los metodos privados desde fuera.
updateCart(product:Product):void{
    this.addToCart(product);
    this.quantityProducts();
    this.calcTotal();
}
//metodos privados 
private addToCart(product: Product):void{
    this.products.push(product);
    this.cartSubject.next(this.products);
}

private quantityProducts():void {
    const quantity = this.products.length;
    this.quantitySubject.next(quantity);
}

private calcTotal():void{
    const total = this.products.reduce((acc, prod)=> acc+=prod.price,0);
    this.totalSubject.next(total);
}

}