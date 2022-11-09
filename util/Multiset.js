module.exports = class Multiset extends Map {
    constructor(...args) {
        super(...args);
    }
    add(elem) {
        if (!this.has(elem))
            this.set(elem, 1);
        else
            this.set(elem, this.get(elem)+1);
    }
    remove(elem) {
        var count = this.has(elem) ? this.get(elem) : 0;
        if (count>1) {
            this.set(elem, count-1);
        } else if (count==1) {
            this.delete(elem);
        } else if (count==0)
            throw `tried to remove element ${elem} of type ${typeof elem} from Multiset, but does not exist in Multiset (count is 0 and cannot go negative)`;
        // alternatively do nothing {}
    }
    sort(){
        super.forEach({

        })
    }
}