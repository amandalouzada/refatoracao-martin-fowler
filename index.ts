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
    let result = `Statement for ${invoice.customer}\n`;

    for (let perf of invoice.performances) {
        // exibe a linha para esta requisição
        result += ` ${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience} seats)\n`;
      
    }

    for (let perf of invoice.performances) {
        totalAmount += amountFor(perf);
    }
    
    result += `Amount owed is ${usd(totalAmount)}\n`;
    result += `You earned ${totalVolumeCredits()} credits\n`;
    return result;
}


export const totalVolumeCredits = () => {
    let result = 0;
    for (let perf of invoices[0].performances) {
        result += volumeCreditsFor(perf);
    }
    return result;
}


export const usd = (aNumber: number): string => {
    return new Intl.NumberFormat(
        "en-US",
        {
            style: "currency",
            currency: "USD", minimumFractionDigits: 2
        }
    ).format(aNumber / 100);
}
export const volumeCreditsFor = (aPerformance: { playID: string; audience: number; }): number => {
    let result = 0;
    result += Math.max(aPerformance.audience - 30, 0);
    if ("comedy" === playFor(aPerformance).type)
        result += Math.floor(aPerformance.audience / 5);
    return result;
}

export const playFor = (aPerformance: { playID: string; audience: number; }): { name: string; type: string; } => {
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

