import { Librarian } from "./librarian.interface";

export interface Membership {
    type: string;
    price: number;
    dateCreated: Date;
    dateUpdated: Date;
    librarianCreated: Librarian;
    librarianUpdated: Librarian;
}