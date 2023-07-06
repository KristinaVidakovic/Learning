import { Document } from "mongoose";
import { LibrarianDocument } from "./librarian.document.type";
import { MembershipDocument } from "./membership.document.type";

export type UserDocument = Document & {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateCreated: Date;
  dateUpdated: Date;
  librarianCreated: LibrarianDocument;
  librarianUpdated: LibrarianDocument;
  membership: MembershipDocument;
  deleted: boolean;
};