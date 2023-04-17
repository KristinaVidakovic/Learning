import { UserDocument } from "../documents/user.document.type";

export type UserInput = {
  id: UserDocument["id"];
  firstName: UserDocument["firstName"];
  lastName: UserDocument["lastName"];
  email: UserDocument["email"];
  phone: UserDocument["phone"];
  dateCreated: UserDocument["dateCreated"];
  dateUpdated: UserDocument["dateUpdated"];
  librarianCreated: UserDocument["librarianCreated"];
  librarianUpdated: UserDocument["librarianUpdated"];
  membership: UserDocument["membership"];
  rent: UserDocument["rent"];
};