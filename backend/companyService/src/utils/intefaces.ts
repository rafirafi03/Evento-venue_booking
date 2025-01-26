export interface IEditVenue {
        _id?: string;
        companyId?: string;
        name?: string;
        type?: string;
        amount?: number;
        description?: string;
        capacity?: number;
        address?: string;
        phone?: number;
        city?: string;
        state?: string;
        images?: string[]
        isListed?: boolean;
        offerId?: string;
        isCompanyBlocked?: boolean;
}