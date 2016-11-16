import { DatabaseRecord } from './DatabaseRecord';

export class Node {

    static paddingPerLevel: number = 130;
    public dbrecord: DatabaseRecord;
    public isexpanded: boolean;

    constructor(dbrecord: DatabaseRecord, isexpanded: boolean = false) {

        if ((dbrecord.is_entity && dbrecord.is_instance) || (!dbrecord.is_entity && !dbrecord.is_instance)) {
            throw new Error('is_entity and is_instance cannot both be false or true');
        } else {
            this.dbrecord = dbrecord;
        }
        this.isexpanded = isexpanded;
    }

}
