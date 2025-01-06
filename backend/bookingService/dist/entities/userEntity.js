"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor({ _id, name, email, phone }) {
        this._id = _id;
        this.name = name;
        this.email = email;
        this.phone = phone;
    }
}
exports.User = User;
