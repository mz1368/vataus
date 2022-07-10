import { Injectable } from '@angular/core';
import { from, Observable, of, throwError } from 'rxjs';
import { VatState } from "./vat.model";

@Injectable({ providedIn: 'root' })
export class CalculatorService {

  
  constructor() {}
  

  calculateByNet(net:number,vatRate:number): Observable<VatState> {
      if (!this.validateInput(net)||!this.validateInput(vatRate)){
        //throw new Error('Please input valid number');
       return throwError(()=>new Error('Please input valid number'))
      
      } 
      const vat:number=Number((net*(vatRate/100)).toFixed(2));
      const gross:number=Number((vat+net).toFixed(2));
      return of({gross:gross,vat:vat,net:net,error:null,status:'success'});
  }
    calculateByVat(vat:number,vatRate:number): Observable<VatState> {
    if (!this.validateInput(vat)||!this.validateInput(vatRate)){
      return throwError(()=>new Error('Please input valid number'))
    } 
      const gross:number=parseFloat(((vat/vatRate)*100).toFixed(2));
      const net:number=parseFloat((gross+vat).toFixed(2));
      return of({gross:gross,vat:vat,net:net,error:null,status:'success'});
  }
    calculateByGross(gross:number,vatRate:number):  Observable<VatState> {
      if (!this.validateInput(gross)||!this.validateInput(vatRate)){
        return throwError(()=>new Error('Please input valid number'))
      } 
      const vat=parseFloat(((gross/(1+vatRate/100))/10).toFixed(2));
      const net=(gross-vat);
      return of({gross:gross,vat:vat,net:net,error:null,status:'success'});
  }
  private validateInput(input:number){
    const inputStr=input.toString();
    const regExp : RegExp = /^([0-9]*[1-9][0-9]*(\.[0-9]+)?|[0]+\.[0-9]*[1-9][0-9]*)$/g; 
    return regExp.test(inputStr);
  }
}