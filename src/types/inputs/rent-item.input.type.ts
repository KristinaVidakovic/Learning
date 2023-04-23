import { RentItemDocument } from "documents/rent-item.document.type";

export type RentItemInput = {
    quantity: RentItemDocument["quantity"];
    rent: RentItemDocument["rent"];
    book: RentItemDocument["book"];
};