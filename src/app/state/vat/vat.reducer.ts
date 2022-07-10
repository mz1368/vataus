import { createReducer, on } from '@ngrx/store';
import {
ChangeGross,
ChangeNet,
ChangeVat,
VatFailure,
VatSuccess
} from './vat.actions';
import { VatState } from '../../shared/vat.model';

export const initialState: VatState = {
    gross:0,
    net:0,
    vat:0,
    error:null,
    status: 'pending'
};

export const vatReducer = createReducer(
    initialState,
    on(ChangeGross, (state, { gross, vatRate }) => {
     return{ ...state,
      gross,
      vatRate,
      status:'pending'
    }
    }),
    on(ChangeNet, (state, { net,vatRate }) => {
       return {...state,
        net,
        vatRate,
        status:'pending'
        }
      }),
      on(ChangeVat, (state, { vat,vatRate }) => {
       return{ ...state,
        vat,
        vatRate,
        status:'pending'
       }
      }),
      on(VatSuccess, (state, { net,vat,gross }) => {
        return {
        ...state,
        net: net,
        vat: vat,
        gross: gross,
        status: 'success',
        error:null
       }
      }),
      on(VatFailure, (state, { error}) => {
        return { ...state,
        error: error,
        status: 'error',
      }})
  );


