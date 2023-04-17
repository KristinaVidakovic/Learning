import { RentItemDocument } from "documents/rent-item.document.type";

export type RentItemInput = {
    id: RentItemDocument["id"];
    quantity: RentItemDocument["quantity"];
    rent: RentItemDocument["rent"];
    book: RentItemDocument["book"];
};