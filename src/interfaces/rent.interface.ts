import { User } from "./user.interface";
import { RentItem } from "./rent-item.interface";
import { Librarian } from "./librarian.interface";

export interface Rent {
    dateCreated: Date;
    dateModified: Date;
    deadline: Date;
    user: User;
    items: Array<RentItem>;
    deleted: boolean;
    librarianCreated: Librarian;
    librarianUpdated: Librarian;
}