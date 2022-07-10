import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { VatState } from '../../shared/vat.model';

export const vat = (state: AppState) => state.vat;
export const selectVat = createSelector(
    vat,
  (state: VatState) => state
);
