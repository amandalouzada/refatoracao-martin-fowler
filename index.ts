// const plays = require('./plays.json');

import playsImport from './plays';
import invoicesImport from './invoices';

interface IPerformance {
    playID: string;
    audience: number;
}
interface IPlay {
    name: string;
    type: string;
}

const plays: { [key: string]: IPlay } = playsImport;
const invoices: {
    customer: string;
    performances: IPerformance[]
}[] = invoicesImport;

export const statement = (invoice: any, plays: any) => {
    const statementData = {
        customer: invoice.customer,
        performances: invoice.performances.map(enrichPerformance)
    };
    return renderPlainText(statementData)
}

export const renderPlainText = (data: any): string => {
    let result = `Statement for ${data.customer}\n`;

    for (let perf of data.performances) {
        result += ` ${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience} seats)\n`;
    }
    result += `Amount owed is ${usd(totalAmount(data.performances))}\n`;
    result += `You earned ${totalVolumeCredits()} credits\n`;
    return result;
}

export const enrichPerformance = (aPerformance: any) => {
    let result = Object.assign({}, aPerformance);
    result.play = playFor(result);
    return result;
}


export const playFor = (aPerformance: IPerformance): IPlay => {
    return plays[aPerformance.playID];
}

export const totalAmount = (performances: IPerformance[]) => {
    let result = 0;
    for (let perf of performances) {
        result += amountFor(perf);
    }
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
export const volumeCreditsFor = (aPerformance: IPerformance): number => {
    let result = 0;
    result += Math.max(aPerformance.audience - 30, 0);
    if ("comedy" === playFor(aPerformance).type)
        result += Math.floor(aPerformance.audience / 5);
    return result;
}

export const amountFor = (aPerformance: IPerformance): number => {
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

