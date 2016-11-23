import { DatabaseRecord } from '../DatabaseRecord';

export class NodeLogic {

    static paddingPerLevel: number = 30;
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

    public class(): string {

        let nodeclass = '';
        if (this.dbrecord.is_instance) {
            nodeclass += 'instance';
        } else if (this.dbrecord.is_entity) {
            nodeclass += 'entity';
        } else {
            throw new Error('Unknown clause');
        }
        return nodeclass;
    }

}
