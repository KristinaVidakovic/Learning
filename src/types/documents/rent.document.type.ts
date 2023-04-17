import { Date, Document } from "mongoose";

export type RentDocument = Document & {
    id: string;
    dateCreated: Date;
    deadline: Date;
}