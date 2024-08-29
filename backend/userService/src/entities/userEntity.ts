export interface IUserData {
    _id?: any;
    userName: string;
    email: string;
    phone: number | null;
    password: string;
}

export class User {
    _id?: any;
    userName: string;
    email: string;
    phone: number | null;
    password: string;

    constructor({ _id,userName,email,phone,password} : IUserData) {
        this._id = _id;
        this.userName = userName;
        this.email = email;
        this.phone = phone;
        this.password = password;
    }
}