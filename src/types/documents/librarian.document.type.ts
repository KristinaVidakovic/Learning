import { Document } from "mongoose";

export type LibrarianDocument = Document & {
    firstName: string;
    lastName: string;
};