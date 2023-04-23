import { BookDocument } from "documents/book.document.type";

export type BookInput = {
    title: BookDocument["title"];
    ISBN: BookDocument["ISBN"];
    publisher: BookDocument["publisher"];
    publicationYear: BookDocument["publicationYear"];
    author: BookDocument["author"];
    genre: BookDocument["genre"];
    occupied: BookDocument["occupied"];
    dateCreated: BookDocument["dateCreated"];
    dateUpdated: BookDocument["dateUpdated"];
    librarianCreated: BookDocument["librarianCreated"];
    librarianUpdated: BookDocument["librarianUpdated"];
};