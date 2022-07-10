import { ActionCreator, createAction, props } from "@ngrx/store";
import { ChangeGross,ChangeNet,ChangeVat,VatSuccess,VatFailure } from "./vat.actions";
import { initialState,vatReducer } from "./vat.reducer";

const  reducer  = vatReducer;
describe('Vat reducer', () => {
    describe('default', () => {
        it('should return init state', () => {
            const noAction = createAction(
                '[Vat Component] No Action',
                props<{ fake:any }>()
              );   
          const initState =  reducer(initialState,noAction);
          expect(initState).toEqual(initialState);
        });
      });
    describe('ChangeGross', () => {
        it('should return pending state', () => {
          const newState = reducer(initialState,ChangeGross);
          expect(newState.status).toBe('pending');
        });
      });
      describe('ChangeNet', () => {
        it('should return pending state', () => {
          const newState = reducer(initialState, ChangeNet);
          expect(newState.status).toBe('pending');
        });
      });
      describe('ChangeVat', () => {
        it('should return pending state', () => {
          const newState = reducer(initialState, ChangeVat);
          expect(newState.status).toBe('pending');
        });
      });
      describe('VatSuccess', () => {
        it('should return success state', () => {
          const newState = reducer(initialState, VatSuccess);
          expect(newState.status).toBe('success');
        });
      });
      describe('VatFailure', () => {
        it('should return error state', () => {
          const newState = reducer(initialState, VatFailure);
          expect(newState.status).toBe('error');
        });
      });
})


