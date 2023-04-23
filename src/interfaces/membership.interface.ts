import { Librarian } from "./librarian.interface";

export interface Membership {
    type: string;
    price: number;
    nextPayment: Date;
    dateCreated: Date;
    dateUpdated: Date;
    librarianCreated: Librarian;
    librarianUpdated: Librarian;
}