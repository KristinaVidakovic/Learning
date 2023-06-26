import { MembershipDocument } from "documents/membership.document.type";

export type MembershipInput = {
    type: MembershipDocument["type"];
    price: MembershipDocument["price"];
    currency: MembershipDocument["currency"];
    dateCreated: MembershipDocument["dateCreated"];
    dateUpdated: MembershipDocument["dateUpdated"];
    librarianCreated: MembershipDocument["librarianCreated"];
    librarianUpdated: MembershipDocument["librarianUpdated"];
    deleted: MembershipDocument["deleted"];
};