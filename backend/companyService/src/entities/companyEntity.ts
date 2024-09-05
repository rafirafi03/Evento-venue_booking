export interface ICompanyData {
    _id?: any;
    name: string;
    email: string;
    phone: number | null;
    country: string;
    password: string;
}

export class Company {
    _id?: any;
    name: string;
    email: string;
    phone: number | null;
    country: string;
    password: string;

    constructor({ _id,name,email,phone,country,password} : ICompanyData) {
        this._id = _id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.country = country
        this.password = password;
    }
}