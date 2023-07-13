import { Librarian } from "./librarian.interface";

export interface Membership {
    type: string;
    price: number;
    currency: string;
    dateCreated: Date;
    dateUpdated: Date;
    librarianCreated: Librarian;
    librarianUpdated: Librarian;
    deleted: boolean;
}