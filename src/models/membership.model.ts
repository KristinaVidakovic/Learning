import { MembershipDocument } from "documents/membership.document.type";
import { MembershipInput } from "inputs/membership.input.type";
import mongoose, { Model, Schema } from "mongoose";

const membershipsSchema = new Schema(
    {
        id: {
            type: Schema.Types.String,
            required: true,
            unique: true
        },
        type: {
            type: Schema.Types.String,
            required: true
        },
        price: {
            type: Schema.Types.Number,
            required: true
        },
        nextPayment: {
            type: Schema.Types.Date,
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

const Membership: Model<MembershipDocument> = mongoose.model<MembershipDocument>(
    "Membership",
    membershipsSchema
);

export {Membership, MembershipInput, MembershipDocument};