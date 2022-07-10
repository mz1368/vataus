import { createAction, props } from '@ngrx/store';

export const ChangeGross = createAction(
    '[Vat Component] Change Gross',
    props<{ gross: number,vatRate:number }>()
  );
  
  export const ChangeNet = createAction(
    '[Vat Component] Change Net',
    props<{ net: number,vatRate:number }>()
  );
  
  export const ChangeVat = createAction(
    '[Vat Component] Change Vat',
    props<{ vat: number,vatRate:number }>()
  );
  
  export const VatSuccess = createAction(
    '[Vat Component] Success Vat',
    props<{net:number, vat: number,gross:number }>()
  );
  
  export const VatFailure = createAction(
    '[Vat Component] Failure Vat',
    props<{ error:string }>()
  );
  