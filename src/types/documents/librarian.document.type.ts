import { Document } from "mongoose";

export type LibrarianDocument = Document & {
    id: string;
    firstName: string;
    lastName: string;
};