export interface IUserData {
    _id?: string;
    userName: string;
    email: string;
    phone: number | null;
    password: string;
    wallet?: number;
}

export class User {
    _id?: string;
    userName: string;
    email: string;
    phone: number | null;
    password: string;
    wallet?:  number;

    constructor({ _id,userName,email,phone,password, wallet} : IUserData) {
        this._id = _id;
        this.userName = userName;
        this.email = email;
        this.phone = phone;
        this.password = password;
        this.wallet = wallet
    }
}