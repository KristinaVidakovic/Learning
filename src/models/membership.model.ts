import { MembershipDocument } from "documents/membership.document.type";
import { MembershipInput } from "inputs/membership.input.type";
import mongoose, { Model, Schema } from "mongoose";

const membershipsSchema = new Schema(
    {
        type: {
            type: Schema.Types.String
        },
        price: {
            type: Schema.Types.Number
        },
        nextPayment: {
            type: Schema.Types.Date
        },
        dateCreated: {
            type: Schema.Types.Date
        },
        dateUpdated: {
            type: Schema.Types.Date
        },
        librarianCreated: {
            type: Schema.Types.Mixed
        },
        librarianUpdated: {
            type: Schema.Types.Mixed
        },
        deleted: {
            type: Schema.Types.Boolean
        }
    }
);

const Membership: Model<MembershipDocument> = mongoose.model<MembershipDocument>(
    "Membership",
    membershipsSchema
);

export {Membership, MembershipInput, MembershipDocument};