import { LibrarianDocument } from "documents/librarian.document.type";
import { LibrarianInput } from "inputs/librarian.input.type";
import mongoose, { Model, Schema } from "mongoose";

const librariansSchema = new Schema(
    {
        id: {
            type: Schema.Types.String,
            required: true,
            unique: true
        },
        firstName: {
            type: Schema.Types.String,
            required: true
        },
        lastName: {
            type: Schema.Types.String,
            required: true
        }
    }  
);

const Librarian: Model<LibrarianDocument> = mongoose.model<LibrarianDocument>(
    "Librarian",
    librariansSchema
);

export {Librarian, LibrarianInput, LibrarianDocument};