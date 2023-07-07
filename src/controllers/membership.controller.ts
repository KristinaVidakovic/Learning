import { Request, Response } from "express";
import { Membership, MembershipInput } from "../models/membership.model";
import { existLibrarian } from "./librarian.controller";

/**
 * @route POST /membership
 * @desc Create a membership
 * @return {Object} membership
 */

const createMembership = async (req: Request, res: Response) => {

    const { type, price, currency, librarianCreated } = req.body;

    if (!type || !price || !librarianCreated || !currency) {
        return res.status(400).json({ message: "Missing values!" });
    }

    const isExistingLibrarian = await existLibrarian(librarianCreated);

    if (isExistingLibrarian === "Provide librarian full name!") {
        return res.status(400).json({ message: "Provide librarian full name!" });
    }

    if (isExistingLibrarian === "Provided librarian doesn't exist.") {
        return res.status(400).json({ message: "Provided librarian doesn't exist." });
    }

    const mem = await Membership.findOne({
        type: type,
        price: price,
        currency: currency
    });

    if (mem) {
        return res.status(400).json({ message: "Provided membership exists." });
    }

    try {
        const membershipInput: MembershipInput = {
            type,
            price,
            currency,
            dateCreated: new Date(),
            dateUpdated: new Date(),
            librarianCreated,
            librarianUpdated: librarianCreated,
            deleted: false
        };

        const membershipCreated = await Membership.create(membershipInput);

        return res.status(201).json({ membership: membershipCreated });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error!" });
    }

};

/**
 * @route PUT /membership/:id
 * @desc Update a membership
 * @return {Object} membership
 */

const updateMembership = async (req: Request, res: Response) => {

    const id = req.params.id;
    const { type, price, currency, librarianUpdated } = req.body;

    if (!librarianUpdated) {
        return res.status(400).json({ message: "Missing values!" });
    }

    const membership = await Membership.findById(id);

    if (!membership) {
        return res.status(400).json({ message: "Memebrship with provided ID doesn't exists!" });
    }

    const isExistingLibrarian = await existLibrarian(librarianUpdated);

    if (isExistingLibrarian === "Provide librarian full name!") {
        return res.status(400).json({ message: "Provide librarian full name!" });
    }

    if (isExistingLibrarian === "Provided librarian doesn't exist.") {
        return res.status(400).json({ message: "Provided librarian doesn't exist." });
    }

    try {
        const membershipInput: MembershipInput = {
            type: !type ? membership.type : type,
            price: !price ? membership.price : price,
            currency: !currency ? membership.currency : currency,
            dateCreated: membership.dateCreated,
            dateUpdated: new Date(),
            librarianCreated: membership.librarianCreated,
            librarianUpdated: librarianUpdated,
            deleted: membership.deleted
        };

        const membershipUpdated = await Membership.findOneAndUpdate({ _id: id }, { $set: membershipInput, $inc: { __v: 1 } }, { new: true });

        return res.status(200).json({ membership: membershipUpdated });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error." });
    }
};

/**
 * @route GET /memberships
 * @desc Get all memberships
 * @return {Object} membership
 */

const getMemberships = async (req: Request, res: Response) => {

    let memberships = await Membership.find();

    if (Array.isArray(memberships) && memberships.length == 0) {
        return res.status(204).json({});
    }

    return res.status(200).json({ memberships: memberships });
};


/**
 * @route DELETE /membership/:id
 * @desc Delete a membership
 * @return {Object} membership
 */

const deleteMembership = async (req: Request, res: Response) => {

    const id = req.params.id;

    const membership = await Membership.findById(id);

    if (membership == null) {
        return res.status(400).json({ message: `Couldn't find membership with ID ${id}` });
    }

    if (membership.deleted === true) {
        return res.status(400).json({ message: "Membership already deleted" });
    }

    const deletedMembership = await Membership.findByIdAndUpdate({ _id: id }, { $set: { deleted: true }, $inc: { __v: 1 } }, { new: true });

    return res.status(200).json({ deleted: deletedMembership });
};

export { createMembership, updateMembership, getMemberships, deleteMembership };