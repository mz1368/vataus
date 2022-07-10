import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './state/app.state';
import { ChangeGross, ChangeNet, ChangeVat } from './state/vat/vat.actions';
import { selectVat } from './state/vat/vat.selectors';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-vat',
  templateUrl: './vat.component.html',
  styleUrls: ['./vat.component.scss']
})

export class VatComponent implements OnInit {

  currentInput:string='Net';
  gross='';
  net='';
  vat='';
  stepIndex: number = 0;
  steps: number[] = [10,13,20];
  vatRate:number=10;
  isValidInput:boolean=true;
  
  public vat$ = this.store.select(selectVat);
  
  constructor(private store: Store<AppState>,private _snackBar: MatSnackBar) {}
  ngOnInit(): void {
    this.vat$.subscribe((vatObj)=>{
      if (vatObj.status==='error'){
        this._snackBar.open(vatObj.error??'', 'close',{duration:3000});
      }
      else{
        this.net=vatObj.net>0 ?vatObj.net.toString() :'';
        this.vat=vatObj.vat>0 ?vatObj.vat.toString() :'';
        this.gross=vatObj.gross>0 ?vatObj.gross.toString() :'';
      }
    })
  }

  onSliderChange($event: any) {
    this.stepIndex = +$event.value;
    this.vatRate = this.steps[this.stepIndex];
    console.log(this.currentInput)
    switch(this.currentInput){
          case 'Net':
            this.onNetChanged();
            break;
          case 'Gross':
            this.onGrossChanged();
            break;
          case 'VAT':
            this.onVatChanged();
    }
  }

  onNetChanged(){
    this.store.dispatch(ChangeNet({net: +this.net,vatRate:+this.vatRate }));
  }
  onVatChanged(){
    this.store.dispatch(ChangeVat({vat: +this.vat,vatRate:+this.vatRate }));
  }
  onGrossChanged(){
    this.store.dispatch(ChangeGross({gross:+this.gross,vatRate:+this.vatRate }));
  }

}
