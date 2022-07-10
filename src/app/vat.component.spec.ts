import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Store, StoreModule } from '@ngrx/store';
import { MaterialModule } from 'src/material.module';
import { vatReducer } from './state/vat/vat.reducer';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { VatComponent } from './vat.component';

describe('VatCalculatorComponent', () => {
  let component: VatComponent;
  let fixture: ComponentFixture<VatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VatComponent ],
      imports:[
          BrowserAnimationsModule,
          MaterialModule,
          FormsModule,
          ReactiveFormsModule,
          StoreModule.forRoot({ vat: vatReducer })],
      providers:[MatSnackBar]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
