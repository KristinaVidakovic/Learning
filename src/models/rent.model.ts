import { RentDocument } from "documents/rent.document.type";
import { RentInput } from "inputs/rent.input.type";
import mongoose, { Model, Schema } from "mongoose";

const rentsSchema = new Schema(
    {
        dateCreated: {
            type: Schema.Types.Date
        },
        deadline: {
            type: Schema.Types.Date
        }
    }
);

const Rent: Model<RentDocument> = mongoose.model<RentDocument>(
    "Rent",
    rentsSchema
); 

export {Rent, RentInput, RentDocument};