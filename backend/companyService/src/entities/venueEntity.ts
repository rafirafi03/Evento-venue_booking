import mongoose from "mongoose";

export interface IVenueData {
    _id?: mongoose.Types.ObjectId;
    name: string;
    type: string;
    description: string;
    capacity: number;
    address: string;
    phone: number;
    city: string;
    state: string;
}

export class Venue {
    _id?: mongoose.Types.ObjectId;
    name: string;
    type: string;
    description: string;
    capacity: number;
    address: string;
    phone: number;
    city: string;
    state: string;

    constructor({ _id,name,type,description,capacity,address,phone,city,state} : IVenueData) {
        this._id = _id;
        this.name = name;
        this.type = type;
        this.description = description;
        this.capacity = capacity;
        this.address = address
        this.phone = phone;
        this.city = city;
        this.state = state;
    }
}