import { Document } from "mongoose";

export type RentDocument = Document & {
    dateCreated: Date;
    deadline: Date;
}