import invoicesImport from './invoices';
import { IPerformance, createStatementData } from './createStatementData';



const invoices: {
    customer: string;
    performances: IPerformance[]
}[] = invoicesImport;

export const statement = (invoice: any) => {
    return renderPlainText(createStatementData(invoice))
}



export const renderPlainText = (data: any): string => {
    let result = `Statement for ${data.customer}\n`;

    for (let perf of data.performances) {
        result += ` ${perf.play.name}: ${usd(perf.amount)} (${perf.audience} seats)\n`;
    }
    result += `Amount owed is ${usd(data.totalAmount)}\n`;
    result += `You earned ${data.totalVolumeCredits} credits\n`;
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



console.log(statement(invoices[0]));

