import { RentItemDocument } from "documents/rent-item.document.type";
import { RentItemInput } from "inputs/rent-item.input.type";
import mongoose, { Model, Schema } from "mongoose";

const rentItemsSchema = new Schema(
    {
        id: {
            type: Schema.Types.String,
            required: true,
            unique: true
        },
        quantity: {
            type: Schema.Types.Number,
            required: true
        },
        rent: {
            type: Schema.Types.Mixed,
            required: true
        },
        book: {
            type: Schema.Types.Mixed,
            required: true
        }
    }
);

const RentItem: Model<RentItemDocument> = mongoose.model<RentItemDocument>(
    "RentItem",
    rentItemsSchema
);

export { RentItem, RentItemInput, RentItemDocument };