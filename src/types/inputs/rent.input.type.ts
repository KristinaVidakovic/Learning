import { RentDocument } from "documents/rent.document.type";

export type RentInput = {
    id: RentDocument["id"];
    dateCreated: RentDocument["dateCreated"];
    deadline: RentDocument["deadline"];
};