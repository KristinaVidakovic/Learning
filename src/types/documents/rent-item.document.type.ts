import { Document } from "mongoose";
import { BookDocument } from "./book.document.type";

export type RentItemDocument = Document & {
    quantity: number;
    rent: RentItemDocument;
    book: BookDocument;
    deleted: boolean;
}