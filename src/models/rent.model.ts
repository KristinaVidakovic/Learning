import { RentDocument } from "documents/rent.document.type";
import { RentInput } from "inputs/rent.input.type";
import mongoose, { Model, Schema } from "mongoose";

const rentsSchema = new Schema(
    {
        id: {
            type: Schema.Types.String,
            required: true,
            unique: true
        },
        dateCreated: {
            type: Schema.Types.Date,
            required: true
        },
        deadline: {
            type: Schema.Types.Date,
            required: true
        }
    }
);

const Rent: Model<RentDocument> = mongoose.model<RentDocument>(
    "Rent",
    rentsSchema
); 

export {Rent, RentInput, RentDocument};