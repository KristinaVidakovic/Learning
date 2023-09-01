import { Document } from "mongoose";
import { BookDocument } from "./book.document.type";
import { RentDocument } from "./rent.document.type";

export type RentItemDocument = Document & {
    rent: string;
    book: BookDocument;
    deleted: boolean;
}