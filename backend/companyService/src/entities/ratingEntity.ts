import mongoose from "mongoose";

export interface IRatingData {
    _id?: mongoose.Types.ObjectId;
    userId : string;
    venueId : string;
    userName: string;
    userEmail: string;
    star: number;
    review: string;
}

export class Rating {
    _id?: mongoose.Types.ObjectId;
    userId : string;
    venueId: string;
    userName: string;
    userEmail: string;
    star: number;
    review: string;

    constructor({ _id,userId,venueId, userName, userEmail, star, review} : IRatingData) {
        this._id = _id;
        this.userId = userId
        this.venueId = venueId;
        this.userName = userName;
        this.userEmail = userEmail;
        this.star = star;
        this.review = review;
    }
}