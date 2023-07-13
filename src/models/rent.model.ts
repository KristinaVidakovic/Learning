import { RentDocument } from "documents/rent.document.type";
import { RentInput } from "inputs/rent.input.type";
import mongoose, { Model, Schema } from "mongoose";

const rentsSchema = new Schema(
    {
        dateCreated: {
            type: Schema.Types.Date
        },
        dateUpdated: {
            type: Schema.Types.Date
        },
        deadline: {
            type: Schema.Types.Date
        },
        user: {
            type: Schema.Types.Mixed
        },
        items: {
            type: Schema.Types.Array
        },
        deleted: {
            type: Schema.Types.Boolean
        },
        librarianCreated: {
            type: Schema.Types.Mixed
        },
        librarianUpdated: {
            type: Schema.Types.Mixed
        }
    }
);

const Rent: Model<RentDocument> = mongoose.model<RentDocument>(
    "Rent",
    rentsSchema
); 

export {Rent, RentInput, RentDocument};