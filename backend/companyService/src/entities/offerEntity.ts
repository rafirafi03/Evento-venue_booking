import mongoose from "mongoose";

export interface IOfferData {
    _id?: mongoose.Types.ObjectId;
    companyId : string;
    name: string;
    percentage: number;
    validity: number;
}

export class Offer {
    _id?: mongoose.Types.ObjectId;
    companyId : string;
    name: string;
    percentage: number;
    validity: number;

    constructor({ _id,companyId,name, percentage, validity} : IOfferData) {
        this._id = _id;
        this.companyId = companyId
        this.name = name;
        this.percentage = percentage;
        this.validity = validity
    }
}