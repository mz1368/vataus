import { TestBed } from "@angular/core/testing";
import { from } from "rxjs";
import { CalculatorService } from "./calculator.service";

describe('Calculator Service', () => {
  
    let service:jasmine.SpyObj<CalculatorService> ;

    beforeEach(() => {
           TestBed.configureTestingModule({ providers: [CalculatorService] });
           service = TestBed.inject(CalculatorService) as jasmine.SpyObj<CalculatorService> ;
    });

    describe('calculateByNet',()=>{
        it('get net,vatRate should return appropriate value', () => {
            from(service.calculateByNet(1723911.82,10)).subscribe(res=>{
                expect(res.gross).toBe(1896303);
             });
        });
        it('get invalid number should return error', () => {
            from(service.calculateByNet(0,10)).subscribe({error:(err)=>{
                expect(err).toBeInstanceOf(Error);
            }});
        });
    });
    describe('calculateByVat',()=>{
        it('get vat,vatRate should return appropriate value', () => {
            from( service.calculateByVat(172391.18,10)).subscribe(res=>{
                expect(res.gross).toBe(1723911.8);
             });
        });
        it('get invalid number should return error', () => {
            from(service.calculateByVat(-1,-1)).subscribe({error:(err)=>{
                expect(err).toBeInstanceOf(Error);
            }});
        });
    });
    describe('calculateByGross',()=>{
        it('get gross,vatRate should return appropriate value', () => {
            from( service.calculateByGross(1896303,10)).subscribe(res=>{
                expect(res.net).toBe(1723911.82);
             });
        });
        it('get invalid number should return error', () => {
            from(service.calculateByGross(-1000.36,0)).subscribe({error:(err)=>{
                expect(err).toBeInstanceOf(Error);
            }});
        });
    });
})
    

