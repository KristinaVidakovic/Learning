import { RentDocument } from "documents/rent.document.type";

export type RentInput = {
    dateCreated: RentDocument["dateCreated"];
    dateUpdated: RentDocument["dateUpdated"];
    deadline: RentDocument["deadline"];
    user: RentDocument["user"];
    deleted: RentDocument["deleted"];
    items: RentDocument["items"];
    librarianCreated: RentDocument["librarianCreated"];
    librarianUpdated: RentDocument["librarianUpdated"];
};