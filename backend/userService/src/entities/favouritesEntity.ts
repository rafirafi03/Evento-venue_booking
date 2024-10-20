export interface IFavouritesData {
    _id?: string;
    userId: string;
    venueId: string;
    venueName: string;
    venueAddress: string
    venueImage: string
}

export class Favourites {
    _id?: string;
    userId: string;
    venueId: string;
    venueName: string;
    venueAddress: string;
    venueImage: string;

    constructor({_id, userId, venueId, venueName,venueAddress, venueImage}: IFavouritesData) {
        this._id = _id;
        this.userId = userId;
        this.venueId = venueId;
        this.venueName = venueName;
        this.venueAddress = venueAddress
        this.venueImage = venueImage
    }
}