import { Document } from "mongoose";
import { LibrarianDocument } from "./librarian.document.type";

export type BookDocument = Document & {
    title: string;
    ISBN: string;
    publisher: string;
    publicationYear: number;
    author: string;
    genre: string;
    occupied: boolean;
    dateCreated: Date;
    dateUpdated: Date;
    librarianCreated: LibrarianDocument;
    librarianUpdated: LibrarianDocument;
    deleted: boolean;
}