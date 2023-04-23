import { RentDocument } from "documents/rent.document.type";

export type RentInput = {
    dateCreated: RentDocument["dateCreated"];
    deadline: RentDocument["deadline"];
};