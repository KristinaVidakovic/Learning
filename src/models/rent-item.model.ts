import { RentItemDocument } from "documents/rent-item.document.type";
import { RentItemInput } from "inputs/rent-item.input.type";
import mongoose, { Model, Schema } from "mongoose";

const rentItemsSchema = new Schema(
    {
        rent: {
            type: Schema.Types.String
        },
        book: {
            type: Schema.Types.Mixed
        },
        deleted: {
            type: Schema.Types.Boolean
        }
    }
);

const RentItem: Model<RentItemDocument> = mongoose.model<RentItemDocument>(
    "RentItem",
    rentItemsSchema
);

export { RentItem, RentItemInput, RentItemDocument };