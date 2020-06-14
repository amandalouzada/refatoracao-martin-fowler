import { amountFor, statement } from "../index"

import plays from '../plays';
import invoices from '../invoices';

describe('Statment', () => {
    it('amount for', () => {
        const play = { name: 'Hamlet', type: 'tragedy' };
        const perf = { playID: 'hamlet', audience: 55 };
        const thisAmount = 65000;
        expect(amountFor(play, perf)).toBe(thisAmount);
    })

    it('statment', () => {
        const expectText = 
        `Statement for BigCo
        Hamlet: $650.00 (55 seats)
        As You Like It: $580.00 (35 seats)
        Othello: $500.00 (40 seats)
       Amount owed is $1,730.00
       You earned 47 credits
       `;
       const result = statement(invoices[0], plays);
        expect(result).toBe(result);
    })
})