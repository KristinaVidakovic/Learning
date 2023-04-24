import { BookDocument } from "documents/book.document.type";
import { BookInput } from "inputs/book.input.type";
import mongoose, { Model, Schema } from "mongoose";

const booksSchema = new Schema(
    {
        title: {
            type: Schema.Types.Mixed
        },
        ISBN: {
            type: Schema.Types.String
        },
        publisher: {
            type: Schema.Types.String
        },
        publicationYear: {
            type: Schema.Types.Number
        },
        author: {
            type: Schema.Types.String
        },
        genre: {
            type: Schema.Types.String
        },
        occupied: {
            type: Schema.Types.Boolean
        },
        dateCreated: {
            type: Schema.Types.Date
        },
        dateUpdated: {
            type: Schema.Types.Date
        },
        librarianCreated: {
            type: Schema.Types.Mixed
        },
        librarianUpdated: {
            type: Schema.Types.Mixed
        },
        deleted: {
            type: Schema.Types.Boolean
        }
    }
);

const Book: Model<BookDocument> = mongoose.model<BookDocument>(
    "Book",
    booksSchema
);

export {Book, BookInput, BookDocument};