import { amountFor } from "../index"

import plays from '../plays';
import invoices from '../invoices';


describe('Statment', () => {
    it('amount for', async () => {
        const play = { name: 'Hamlet', type: 'tragedy' };

        expect(amountFor(play)).toBe(6500);

    })
})