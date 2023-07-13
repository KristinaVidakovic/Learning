import { Book } from "./book.interface";
import { Rent } from "./rent.interface";

export interface RentItem {
    quantity: number;
    rent: string;
    book: Book;
    deleted: boolean;
}