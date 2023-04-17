import { Document } from "mongoose";
import { BookDocument } from "./book.document.type";

export type RentItemDocument = Document & {
    id: string;
    quantity: number;
    rent: RentItemDocument;//interface
    book: BookDocument;//interface
}