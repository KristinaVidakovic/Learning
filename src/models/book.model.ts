import { BookDocument } from "documents/book.document.type";
import { BookInput } from "inputs/book.input.type";
import mongoose, { Model, Schema } from "mongoose";

const booksSchema = new Schema(
    {
        id: {
            type: Schema.Types.String,
            required: true,
            unique: true
        },
        title: {
            type: Schema.Types.Mixed,
            required: true
        },
        ISBN: {
            type: Schema.Types.String,
            required: true
        },
        publisher: {
            type: Schema.Types.String,
            required: true
        },
        publicationYear: {
            type: Schema.Types.Number,
            required: true
        },
        author: {
            type: Schema.Types.String,
            required: true
        },
        genre: {
            type: Schema.Types.String,
            required: true
        },
        occupied: {
            type: Schema.Types.Boolean,
            required: true
        },
        dateCreated: {
            type: Schema.Types.Date,
            required: true
        },
        dateUpdated: {
            type: Schema.Types.Date,
            required: true
        },
        librarianCreated: {
            type: Schema.Types.Mixed,
            required: true
        },
        librarianUpdated: {
            type: Schema.Types.Mixed,
            required: true
        }
    }
);

const Book: Model<BookDocument> = mongoose.model<BookDocument>(
    "Book",
    booksSchema
);

export {Book, BookInput, BookDocument};