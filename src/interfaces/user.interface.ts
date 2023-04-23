import { Librarian } from "./librarian.interface";
import { Membership } from "./membership.interface";
import { Rent } from "./rent.interface";

export interface User {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateCreated: Date;
    dateUpdated: Date;
    librarianCreated: Librarian;
    librarianUpdated: Librarian;
    membership: Membership;
    rent: Rent;
}