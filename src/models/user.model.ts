import mongoose, { Schema, Model } from "mongoose";
import { UserDocument } from "documents/user.document.type";
import { UserInput } from "inputs/user.input.type";

const usersSchema = new Schema(
  {
    id: {
      type: Schema.Types.String,
      required: true,
      unique: true
    },
    firstName: {
      type: Schema.Types.String,
      required: true,
    },
    lastName: {
      type: Schema.Types.String,
      required: true,
    },
    email: {
      type: Schema.Types.String,
      required: true,
      unique: true,
    },
    phone: {
      type: Schema.Types.String,
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
    },
    membership: {
      type: Schema.Types.Mixed,
      required: true
    },
    rent: {
      type: Schema.Types.Mixed,
      required: true
    }
  }
);

const User: Model<UserDocument> = mongoose.model<UserDocument>(
  "User",
  usersSchema
);

export { User, UserInput, UserDocument };