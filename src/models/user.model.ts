import mongoose, { Schema, Model } from "mongoose";
import { UserDocument } from "documents/user.document.type";
import { UserInput } from "inputs/user.input.type";

const usersSchema = new Schema(
  {
    firstName: {
      type: Schema.Types.String
    },
    lastName: {
      type: Schema.Types.String
    },
    email: {
      type: Schema.Types.String,
      required: true,
      unique: true,
    },
    phone: {
      type: Schema.Types.String
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
    membership: {
      type: Schema.Types.Mixed
    },
    rent: {
      type: Schema.Types.Mixed
    },
    deleted: {
      type: Schema.Types.Boolean
    }
  }
);

const User: Model<UserDocument> = mongoose.model<UserDocument>(
  "User",
  usersSchema
);

export { User, UserInput, UserDocument };