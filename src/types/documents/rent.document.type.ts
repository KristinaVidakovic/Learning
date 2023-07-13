import { Document } from "mongoose";
import { UserDocument } from "./user.document.type";
import { LibrarianDocument } from "./librarian.document.type";
import { RentItemDocument } from "./rent-item.document.type";

export type RentDocument = Document & {
    dateCreated: Date;
    dateUpdated: Date;
    deadline: Date;
    deleted: boolean;
    user: UserDocument;
    items: Array<RentItemDocument>;
    librarianCreated: LibrarianDocument;
    librarianUpdated: LibrarianDocument;
}