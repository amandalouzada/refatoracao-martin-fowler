import { statement, usd, renderPlainText, } from "../index";

import plays from '../plays';
import invoices from '../invoices';
import { amountFor, playFor, volumeCreditsFor, totalVolumeCredits, enrichPerformance, totalAmount, createStatementData } from "../createStatementData";

describe('Statment', () => {
    const statementData = {
        customer: 'BigCo',
        performances:
            [{
                playID: 'hamlet',
                audience: 55,
                amount: 65000,
                volumeCredits: 25,
                play: { name: 'Hamlet', type: 'tragedy' }
            },
            {
                playID: 'as-like',
                audience: 35,
                amount: 58000,
                volumeCredits: 12,
                play: { name: 'As You Like It', type: 'comedy' }
            },
            {
                playID: 'othello',
                audience: 40,
                amount: 50000,
                volumeCredits: 10,
                play: { name: 'Othello', type: 'tragedy' }
            }],
        totalAmount: 173000,
        totalVolumeCredits: 47
    };

    // it('amount for', () => {
    //     const aPerformance = {
    //         playID: 'hamlet',
    //         audience: 55,
    //         play: { name: 'Hamlet', type: 'tragedy' }, amount: 0,
    //         totalAmount: 0,
    //         volumeCredits: 0
    //     };
    //     const thisAmount = 65000;
    //     expect(amountFor(aPerformance)).toBe(thisAmount);
    // })

    it('statment', () => {
        const expectText =
            `Statement for BigCo\n Hamlet: $650.00 (55 seats)\n As You Like It: $580.00 (35 seats)\n Othello: $500.00 (40 seats)\nAmount owed is $1,730.00\nYou earned 47 credits\n`;
        const result = statement(invoices[0]);
        expect(result).toBe(expectText);
    })

    it('render plain text', () => {
        const expectText =
            `Statement for BigCo\n Hamlet: $650.00 (55 seats)\n As You Like It: $580.00 (35 seats)\n Othello: $500.00 (40 seats)\nAmount owed is $1,730.00\nYou earned 47 credits\n`;

        const result = renderPlainText(statementData);
        expect(result).toBe(expectText);
    })

    // it('play for', () => {
    //     const aPerformance = { playID: 'hamlet', audience: 55 };
    //     const result = playFor(aPerformance);
    //     expect(result).toStrictEqual({ name: 'Hamlet', type: 'tragedy' });
    // })

    // it('volume Credits for', () => {
    //     const aPerformance = {
    //         playID: 'hamlet',
    //         audience: 55,
    //         play: { name: 'Hamlet', type: 'tragedy' },
    //         amount: 0,
    //         volumeCredits: 0
    //     };
    //     expect(volumeCreditsFor(aPerformance)).toBe(25);
    // })

    // it('format', () => {
    //     expect(usd(65000)).toBe('$650.00');
    // })

    // it('total Volume Credits', () => {
    //     const copyStatementData = Object.assign({}, statementData);
    //     copyStatementData.totalVolumeCredits = 0;
    //     expect(totalVolumeCredits(copyStatementData)).toBe(47);
    // })

    // it('enrich Performance', () => {
    //     const aPerformance = { playID: 'hamlet', audience: 55 };
    //     expect(enrichPerformance(aPerformance)).toStrictEqual({
    //         playID: 'hamlet',
    //         audience: 55,
    //         play: { name: 'Hamlet', type: 'tragedy' },
    //         amount: 65000,
    //         volumeCredits: 25
    //     });
    // })

    // it('total Amount', () => {
    //     const copyStatementData = Object.assign({}, statementData);
    //     copyStatementData.totalAmount = 0;
    //     expect(totalAmount(copyStatementData)).toBe(173000);
    // })
    it('create statement data', () => {
        expect(createStatementData(invoices[0])).toStrictEqual(statementData);
    })


})