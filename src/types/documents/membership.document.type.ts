import { Date, Document } from "mongoose";
import { LibrarianDocument } from "./librarian.document.type";

export type MembershipDocument = Document & {
    type: string;
    price: number;
    nextPayment: Date;
    dateCreated: Date;
    dateUpdated: Date;
    librarianCreated: LibrarianDocument;
    librarianUpdated: LibrarianDocument;
    deleted: boolean;
}