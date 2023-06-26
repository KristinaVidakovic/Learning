import { Request, Response } from "express";
import { User, UserInput } from "../models/user.model";
import { Librarian } from "../models/librarian.model";
import { Membership } from "../models/membership.model";
import { existLibrarian } from "./librarian.controller";

/**
 * @route POST /user
 * @desc Create a user 
 * @return {Object} user
 */

const createUser = async(req: Request, res: Response) => {

    const { firstName, lastName, email, phone, librarianCreated, membership } = req.body;

    if (!firstName || !lastName || !email || !phone || !librarianCreated || !membership) {
        return res.status(400).json({ message: "Missing values!" });
    }

    try {
        const isExistingLibrarian = await existLibrarian(librarianCreated);

        if (isExistingLibrarian === "Provide librarian full name!") {
            return res.status(400).json({ message: "Provide librarian full name!" });
        }

        if (isExistingLibrarian === "Provided librarian doesn't exist.") {
            return res.status(400).json({ message: "Provided librarian doesn't exist." });
        }

        const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

        if (!expression.test(email)) {
            return res.status(400).json({ message: "Provide valid email." })
        }

        const mem = await Membership.findOne({
            type: membership
        });

        if (!mem) {
            return res.status(400).json({ message: "Provided membership type doesn't exist." });
        }

        const userInput: UserInput = {
            firstName,
            lastName,
            email,
            phone,
            dateCreated: new Date(),
            dateUpdated: new Date(),
            librarianCreated,
            librarianUpdated: librarianCreated,
            membership,
            rent: null,
            deleted: false
        };

        const userCreated = await User.create(userInput);

        return res.status(201).json({ user: userCreated });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error!" });
    }
};

export {createUser};