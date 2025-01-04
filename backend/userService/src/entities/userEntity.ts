export interface IUserData {
    _id?: string;
    googleId?: string;
    userName: string;
    email: string;
    phone?: number | null;
    password?: string;
    wallet?: number;
    image?: string;
}

export class User {
    _id?: string;
    googleId?: string;
    userName: string;
    email: string;
    phone?: number | null;
    password?: string;
    wallet?:  number;
    image?: string;

    constructor({ _id,googleId,userName,email,phone,password, wallet, image} : IUserData) {
        this._id = _id;
        this.googleId = googleId
        this.userName = userName;
        this.email = email;
        this.phone = phone;
        this.password = password;
        this.wallet = wallet;
        this.image = image
    }
}