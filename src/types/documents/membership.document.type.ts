import { Document } from "mongoose";
import { LibrarianDocument } from "./librarian.document.type";

export type MembershipDocument = Document & {
    type: string;
    price: number;
    currency: string;
    dateCreated: Date;
    dateUpdated: Date;
    librarianCreated: LibrarianDocument;
    librarianUpdated: LibrarianDocument;
    deleted: boolean;
}