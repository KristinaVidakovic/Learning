import { Document } from "mongoose";
import { UserDocument } from "./user.document.type";

export type RentDocument = Document & {
    dateCreated: Date;
    dateUpdated: Date;
    deadline: Date;
    deleted: boolean;
    user: UserDocument;
}