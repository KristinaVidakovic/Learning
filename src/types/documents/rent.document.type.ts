import { Document } from "mongoose";
import { UserDocument } from "./user.document.type";
import { LibrarianDocument } from "./librarian.document.type";

export type RentDocument = Document & {
    dateCreated: Date;
    dateUpdated: Date;
    deadline: Date;
    deleted: boolean;
    user: UserDocument;
    librarianCreated: LibrarianDocument;
    librarianUpdated: LibrarianDocument;
}