import { EtherScanTransactionDataResultModel } from './etherScanTransactionDataResult.model';

export class EtherScanTransactionDataModel {
    status: string;
    message: string;
    result: EtherScanTransactionDataResultModel[];
}