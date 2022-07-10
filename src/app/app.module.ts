import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from 'src/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { VatComponent } from './vat.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { vatReducer } from './state/vat/vat.reducer';
import { EffectsModule } from '@ngrx/effects';
import { VatEffects } from './state/vat/vat.effects';
import { CalculatorService } from './shared/calculator.service';
@NgModule({
  declarations: [
    VatComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    StoreModule.forRoot({ vat: vatReducer }),
    EffectsModule.forRoot([VatEffects]),
  ],
  providers: [CalculatorService],
  bootstrap: [VatComponent]
})
export class AppModule { }
