import { VatState } from "src/app/shared/vat.model";
import { selectVat } from "./vat.selectors";


describe('VatSelector', () => {
    describe('getVat', () => {
      it('should return the vat state', () => {
        const vat = {net:100,vat:10,gross:110} as VatState;
        expect(selectVat.projector(vat)).toEqual(vat);
      });

    });
  });