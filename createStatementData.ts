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

class PerformanceCalculator {
    public performance: IPerformance;
    public play: IPlay;

    constructor(aPerformance: IPerformance, aPlay: IPlay) {
        this.performance = aPerformance;
        this.play = aPlay;
    }

    get amount(): number {
        throw new Error('Subclass responsibility');
    }

    getVolumeCredits(): number {
        return Math.max(this.performance.audience - 30, 0);
    }

    get volumeCredits(): number {
        return this.getVolumeCredits();
    }
}

class TragedyCalculator extends PerformanceCalculator {

    constructor(aPerformance: IPerformance, aPlay: IPlay) {
        super(aPerformance, aPlay);
    }

    get amount(): number {
        let result = 40000;
        if (this.performance.audience > 30) {
            result += 1000 * (this.performance.audience - 30);
        }
        return result;
    }

}

class ComedyCalculator extends PerformanceCalculator {

    constructor(aPerformance: IPerformance, aPlay: IPlay) {
        super(aPerformance, aPlay);
    }
    get amount(): number {
        let result = 30000;
        if (this.performance.audience > 20) {
            result += 10000 + 500 * (this.performance.audience - 20);
        }
        result += 300 * this.performance.audience;
        return result;
    }

    get volumeCredits(): number {
        return this.getVolumeCredits() + Math.floor(this.performance.audience / 5);
    }
}

export const createStatementData = (invoice: any) => {

    const totalAmount = (data: any) => {
        return data.performances.reduce((total: number, p: any) => total + p.amount, 0);
    }

    const totalVolumeCredits = (data: any) => {
        return data.performances.reduce((total: number, p: any) => total + p.volumeCredits, 0);
    }
    const createPerformanceCalculator = (aPerformance: IPerformance, aPlay: IPlay): PerformanceCalculator => {
        const types: { [key: string]: any } = {
            tragedy: () => new TragedyCalculator(aPerformance, playFor(aPerformance)),
            comedy: () => new ComedyCalculator(aPerformance, playFor(aPerformance))
        };
        if (!types[aPlay.type]) throw new Error(`unknown type ${aPlay.type}`)
        return types[aPlay?.type]();

    }


    const enrichPerformance = (aPerformance: IPerformance): ITotalPerformance => {
        const calculator = createPerformanceCalculator(aPerformance, playFor(aPerformance));
        let result: any = Object.assign({}, {
            ...aPerformance,
            amount: 0,
            volumeCredits: 0
        });
        result.play = calculator.play;
        result.amount = calculator.amount;
        result.volumeCredits = calculator.volumeCredits;
        return (result as ITotalPerformance);
    }

    const playFor = (aPerformance: IPerformance): IPlay => {
        return plays[aPerformance.playID];
    }


    let result: any = {
    };
    result.customer = invoice.customer;
    result.performances = invoice.performances.map(enrichPerformance);
    result.totalAmount = totalAmount(result);
    result.totalVolumeCredits = totalVolumeCredits(result);
    return result

}

