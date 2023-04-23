import { MembershipDocument } from "documents/membership.document.type";

export type MembershipInput = {
    type: MembershipDocument["type"];
    price: MembershipDocument["price"];
    nextPayment: MembershipDocument["nextPayment"];
    dateCreated: MembershipDocument["dateCreated"];
    dateUpdated: MembershipDocument["dateUpdated"];
    libararianCreated: MembershipDocument["librarianCreated"];
    librarianUpdated: MembershipDocument["librarianUpdated"];
};