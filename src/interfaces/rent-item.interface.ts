import { Book } from "./book.interface";
import { Rent } from "./rent.interface";

export interface RentItem {
    quantity: number;
    rent: Rent;
    book: Book;
}