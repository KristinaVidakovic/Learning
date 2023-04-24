import { Document } from "mongoose";

export type RentDocument = Document & {
    dateCreated: Date;
    dateUpdated: Date;
    deadline: Date;
    deleted: boolean;
}