export class Category {
    id : number;
    name : string;
    description : string;
    isAvailable : boolean;
    isLocked : boolean;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}