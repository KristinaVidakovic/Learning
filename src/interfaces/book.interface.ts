import { Librarian } from "./librarian.interface";

export interface Book {
    title: string;
    ISBN: string;
    publisher: string;
    publicationYear: number;
    author: string;
    genre: string;
    occupied: boolean;
    dateCreated: Date;
    dateUpdated: Date;
    librarianCreated: Librarian;
    librarianUpdated: Librarian;
    deleted: boolean;
}