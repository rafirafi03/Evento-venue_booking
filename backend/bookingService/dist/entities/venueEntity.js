"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Venue = void 0;
class Venue {
    constructor({ _id, name, amount, city, state, image }) {
        this._id = _id;
        this.name = name;
        this.amount = amount;
        this.city = city;
        this.state = state;
        this.image = image;
    }
}
exports.Venue = Venue;
