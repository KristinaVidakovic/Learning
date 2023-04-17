import { LibrarianDocument } from "documents/librarian.document.type";

export type LibrarianInput = {
    id: LibrarianDocument["id"];
    firstName: LibrarianDocument["firstName"];
    lastName: LibrarianDocument["lastName"];
};