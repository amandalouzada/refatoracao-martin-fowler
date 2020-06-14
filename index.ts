// const plays = require('./plays.json');

import playsImport from './plays';
import invoicesImport from './invoices';


const plays: { [key: string]: { name: string; type: string; } } = playsImport;
const invoices: {
    customer: string;
    performances: {
        playID: string;
        audience: number;
    }[]
}[] = invoicesImport;

export const statement = (invoice: any, plays: any) => {
    let totalAmount = 0;
    let volumeCredits = 0;
    let result = `Statement for ${invoice.customer}\n`;


    const format = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 }).format;
    for (let perf of invoice.performances) {
        let thisAmount = amountFor(perf);

        // soma créditos por volume
        volumeCredits += Math.max(perf.audience - 30, 0);

        // soma um crédito extra para cada dez espectadores de comédia
        if ("comedy" === playFor(perf).type)
            volumeCredits += Math.floor(perf.audience / 5);

        // exibe a linha para esta requisição
        result += ` ${playFor(perf).name}: ${format(thisAmount / 100)} (${perf.audience} seats)\n`;
        totalAmount += thisAmount;
    }
    result += `Amount owed is ${format(totalAmount / 100)}\n`;
    result += `You earned ${volumeCredits} credits\n`;
    return result;
}

export const playFor = (aPerformance: any): { name: string; type: string; }  => {
    return plays[aPerformance.playID];
}


export const amountFor = (aPerformance: { playID: string, audience: number }): number => {
    // Calcula o valor para uma apresentação
    let result = 0;
    switch (playFor(aPerformance).type) {
        case "tragedy":
            result = 40000;
            if (aPerformance.audience > 30) {
                result += 1000 * (aPerformance.audience - 30);
            }
            break;

        case "comedy":
            result = 30000;
            if (aPerformance.audience > 20) {
                result += 10000 + 500 * (aPerformance.audience - 20);
            }
            result += 300 * aPerformance.audience;
            break;
        default:
            throw new Error(`unknown type: ${playFor(aPerformance).type}`);
    }
    return result;
}


console.log(statement(invoices[0], plays));

