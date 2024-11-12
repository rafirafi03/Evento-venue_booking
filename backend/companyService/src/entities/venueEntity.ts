import mongoose from "mongoose";

export interface IVenueData {
    _id?: mongoose.Types.ObjectId;
    companyId : string;
    name: string;
    type: string;
    amount: number;
    capacity: number;
    description: string;
    address: string;
    phone: number;
    city: string;
    state: string;
}

export class Venue {
    _id?: mongoose.Types.ObjectId;
    companyId : string;
    name: string;
    type: string;
    amount: number;
    capacity: number;
    description: string;
    address: string;
    phone: number;
    city: string;
    state: string;

    constructor({ _id,companyId,name,type,amount,capacity,description,address,phone,city,state} : IVenueData) {
        this._id = _id;
        this.companyId = companyId
        this.name = name;
        this.type = type;
        this.amount = amount
        this.capacity = capacity;
        this.description = description;
        this.address = address
        this.phone = phone;
        this.city = city;
        this.state = state;
    }
}