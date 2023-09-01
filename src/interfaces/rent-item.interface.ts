import { Book } from "./book.interface";
import { Rent } from "./rent.interface";

export interface RentItem {
    rent: string;
    book: Book;
    deleted: boolean;
}