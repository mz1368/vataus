import { TestBed } from '@angular/core/testing';
import { CalculatorService } from '../../shared/calculator.service';
import { provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';
import {VatEffects} from './vat.effects'
import { ChangeGross, ChangeNet, ChangeVat, VatFailure, VatSuccess } from './vat.actions';




describe('VatEffects', () => {
    let actions: Observable<any>;
  
    let effects: VatEffects;
    let vatService: jasmine.SpyObj<CalculatorService>;
  
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
            VatEffects,
            provideMockStore({}),
          provideMockActions(() => actions),
          {
            provide: CalculatorService,
            useValue: {
                calculateByNet: jasmine.createSpy(),
                calculateByVat: jasmine.createSpy(),
                calculateByGross: jasmine.createSpy()
            }
          }
        ]
      });
  
      effects = TestBed.inject(VatEffects);
      vatService = TestBed.inject(CalculatorService) as jasmine.SpyObj<CalculatorService>;
    });
  
    describe('Change Net', () => {
      it('should return an action with net,gross, and vat', () => {
        const payload={net:1,vatRate:1};
        const payload_success={net:1,vat:1,gross:1}
        const action =  ChangeNet(payload);
        const outcome = VatSuccess(payload_success);
  
        actions = hot('-a', { a: action });
        const response = cold('-a|', { a: payload_success });
        vatService.calculateByNet.and.returnValue(response);
  
        const expected = cold('--b', { b: outcome });
        expect(effects.calculateNet$).toBeObservable(expected);
      });
  
      it('should fail and return an action with the error', () => {
        const action =  ChangeNet({net:1,vatRate:1});
        const error = new Error() as any;
        const outcome =  VatFailure({error});

        actions = hot('-a', { a: action });
        const response = cold('-#|', {}, error);
        vatService.calculateByNet.and.returnValue(response);

        const expected = cold('--b', { b: outcome });
        expect(effects.calculateNet$).toBeObservable(expected);
       });
    });

    describe('Change Vat', () => {
        it('should return an action with net,gross, and vat', () => {
          const payload={vat:1,vatRate:1};
          const payload_success={net:1,vat:1,gross:1}
          const action =  ChangeVat(payload);
          const outcome = VatSuccess(payload_success);
    
          actions = hot('-a', { a: action });
          const response = cold('-a|', { a: payload_success });
          vatService.calculateByVat.and.returnValue(response);
    
          const expected = cold('--b', { b: outcome });
          expect(effects.calculateVat$).toBeObservable(expected);
        });
    
        it('should fail and return an action with the error', () => {
          const action =  ChangeVat({vat:1,vatRate:1});
          const error = new Error() as any;
          const outcome =  VatFailure({error});
  
          actions = hot('-a', { a: action });
          const response = cold('-#|', {}, error);
          vatService.calculateByVat.and.returnValue(response);
  
          const expected = cold('--b', { b: outcome });
          expect(effects.calculateVat$).toBeObservable(expected);
         });
      });
      describe('Change Gross', () => {
        it('should return an action with net,gross, and vat', () => {
          const payload={gross:1,vatRate:1};
          const payload_success={net:1,vat:1,gross:1}
          const action =  ChangeGross(payload);
          const outcome = VatSuccess(payload_success);
    
          actions = hot('-a', { a: action });
          const response = cold('-a|', { a: payload_success });
          vatService.calculateByGross.and.returnValue(response);
    
          const expected = cold('--b', { b: outcome });
          expect(effects.calculateGross$).toBeObservable(expected);
        });
    
        it('should fail and return an action with the error', () => {
          const action =  ChangeGross({gross:1,vatRate:1});
          const error = new Error() as any;
          const outcome =  VatFailure({error});
  
          actions = hot('-a', { a: action });
          const response = cold('-#|', {}, error);
          vatService.calculateByGross.and.returnValue(response);
  
          const expected = cold('--b', { b: outcome });
          expect(effects.calculateGross$).toBeObservable(expected);
         });
      });
  });