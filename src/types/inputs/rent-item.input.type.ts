import { RentItemDocument } from "documents/rent-item.document.type";

export type RentItemInput = {
    rent: RentItemDocument["rent"];
    book: RentItemDocument["book"];
    deleted: RentItemDocument["deleted"];
};