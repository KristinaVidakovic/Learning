import { Date, Document } from "mongoose";
import { LibrarianDocument } from "./librarian.document.type";

export type MembershipDocument = Document & {
    id: string;
    type: string;
    price: number;
    nextPayment: Date;
    dateCreated: Date;
    dateUpdated: Date;
    librarianCreated: LibrarianDocument;//interface
    librarianUpdated: LibrarianDocument;//interface
}