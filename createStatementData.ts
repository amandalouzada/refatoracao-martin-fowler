import playsImport from './plays';
const plays: { [key: string]: IPlay } = playsImport;

export interface IPerformance {
    playID: string;
    audience: number;
}

export interface ITotalPerformance extends IPerformance {
    play: IPlay;
    amount: number;
    volumeCredits: number;
}
export interface IPlay {
    name: string;
    type: string;
}

export const createStatementData = (invoice: any) => {
    let result: any = {
    };
    result.customer = invoice.customer;
    result.performances = invoice.performances.map(enrichPerformance);
    result.totalAmount = totalAmount(result);
    result.totalVolumeCredits = totalVolumeCredits(result);
    return result
}

export const totalAmount = (data: any) => {
    let result = 0;
    for (let perf of data.performances) {
        result += perf.amount;
    }
    return result;
}

export const totalVolumeCredits = (data: any) => {
    let result = 0;
    for (let perf of data.performances) {
        result += perf.volumeCredits;
    }
    return result;
}

export const enrichPerformance = (aPerformance: IPerformance): ITotalPerformance => {
    let result: any = Object.assign({}, {
        ...aPerformance,
        amount: 0,
        volumeCredits: 0
    });
    result.play = playFor(aPerformance);
    result.amount = amountFor(result);
    result.volumeCredits = volumeCreditsFor(result);
    return (result as ITotalPerformance);
}

export const playFor = (aPerformance: IPerformance): IPlay => {
    return plays[aPerformance.playID];
}


export const amountFor = (aPerformance: ITotalPerformance): number => {
    // Calcula o valor para uma apresentação
    let result = 0;
    switch (aPerformance.play.type) {
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
            throw new Error(`unknown type: ${aPerformance.play.type}`);
    }
    return result;
}

export const volumeCreditsFor = (aPerformance: ITotalPerformance): number => {
    let result = 0;
    result += Math.max(aPerformance.audience - 30, 0);
    if ("comedy" === aPerformance?.play.type)
        result += Math.floor(aPerformance.audience / 5);
    return result;
}