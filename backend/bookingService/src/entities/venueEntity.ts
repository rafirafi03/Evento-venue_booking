import mongoose from "mongoose";

export interface IVenueData {
    _id?: mongoose.Types.ObjectId;
    name: string;
    amount: number;
    city: string;
    state: string;
    image: string;
}

export class Venue {
    _id?: mongoose.Types.ObjectId;
    name: string;
    amount: number;
    city: string;
    state: string;
    image: string;

    constructor({ _id,name,amount,city,state,image} : IVenueData) {
        this._id = _id;
        this.name = name;
        this.amount = amount;
        this.city = city;
        this.state = state;
        this.image = image
    }
}