import { RentItemDocument } from "documents/rent-item.document.type";
import { RentItemInput } from "inputs/rent-item.input.type";
import mongoose, { Model, Schema } from "mongoose";

const rentItemsSchema = new Schema(
    {
        quantity: {
            type: Schema.Types.Number
        },
        rent: {
            type: Schema.Types.Mixed
        },
        book: {
            type: Schema.Types.Mixed
        }
    }
);

const RentItem: Model<RentItemDocument> = mongoose.model<RentItemDocument>(
    "RentItem",
    rentItemsSchema
);

export { RentItem, RentItemInput, RentItemDocument };