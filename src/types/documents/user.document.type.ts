import { Date, Document } from "mongoose";
import { LibrarianDocument } from "./librarian.document.type";
import { MembershipDocument } from "./membership.document.type";
import { RentDocument } from "./rent.document.type";

export type UserDocument = Document & {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateCreated: Date;
  dateUpdated: Date;
  librarianCreated: LibrarianDocument;//interface
  librarianUpdated: LibrarianDocument;//interface
  membership: MembershipDocument;//interface
  rent: RentDocument;//interface
};