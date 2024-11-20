export interface IUserData {
    _id?: string;
    name: string;
    email: string;
    phone: number;
}

export class User {
    _id?: string;
    name: string;
    email: string;
    phone: number

    constructor({ _id,name,email,phone} : IUserData) {
        this._id = _id;
        this.name = name;
        this.email = email;
        this.phone = phone;
    }
}