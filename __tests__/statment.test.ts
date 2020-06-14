import { amountFor, statement, playFor, volumeCreditsFor, usd, totalVolumeCredits } from "../index"

import plays from '../plays';
import invoices from '../invoices';

describe('Statment', () => {
    it('amount for', () => {
        const aPerformance = { playID: 'hamlet', audience: 55 };
        const thisAmount = 65000;
        expect(amountFor(aPerformance)).toBe(thisAmount);
    })

    it('statment', () => {
        const expectText =
            `Statement for BigCo\n Hamlet: $650.00 (55 seats)\n As You Like It: $580.00 (35 seats)\n Othello: $500.00 (40 seats)\nAmount owed is $1,730.00\nYou earned 47 credits\n`;
        const result = statement(invoices[0], plays);
        expect(result).toBe(expectText);
    })

    it('play for', () => {
        const aPerformance = { playID: 'hamlet', audience: 55 };
        const result = playFor(aPerformance);
        expect(result).toStrictEqual({ name: 'Hamlet', type: 'tragedy' });
    })
    it('volume Credits for', () => {
        const aPerformance = { playID: 'hamlet', audience: 55 };
        expect(volumeCreditsFor(aPerformance)).toBe(25);
    })

    it('format', () => {
        expect(usd(65000)).toBe('$650.00');
    })

    it('total Volume Credits', () => {
        expect(totalVolumeCredits()).toBe(47);
    })
})