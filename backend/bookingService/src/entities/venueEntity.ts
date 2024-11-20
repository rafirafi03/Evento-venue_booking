export interface IVenueData {
    _id?: string;
    name: string;
    city: string;
    state: string;
    amount: number;
}

export class Venue {
    _id?: string;
    name: string;
    city: string;
    state: string;
    amount: number;

    constructor({ _id,name,city,state,amount} : IVenueData) {
        this._id = _id;
        this.name = name;
        this.city = city;
        this.state = state;
        this.amount = amount;
    }
}