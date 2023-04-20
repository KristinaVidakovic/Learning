import { LibrarianDocument } from "documents/librarian.document.type";
import { LibrarianInput } from "inputs/librarian.input.type";
import mongoose, { Model, Schema } from "mongoose";

const librariansSchema = new Schema(
    {
        firstName: {
            type: Schema.Types.String
        },
        lastName: {
            type: Schema.Types.String
        }
    }  
);

const Librarian: Model<LibrarianDocument> = mongoose.model<LibrarianDocument>(
    "Librarian",
    librariansSchema
);

export {Librarian, LibrarianInput, LibrarianDocument};