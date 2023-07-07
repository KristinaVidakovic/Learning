import { Request, Response } from "express";
import { User } from "../models/user.model";
import { Rent, RentInput } from "../models/rent.model";
import { existLibrarian } from "./librarian.controller";

/**
 * @route POST /rent
 * @desc Create a rent
 * @return {Object} rent
 */

const createRent = async(req: Request, res: Response) => {

    const { deadline, userId, librarianCreated } = req.body;

    if (!deadline || !userId || !librarianCreated) {
        return res.status(400).json({ message: "Missing values!" });
    }

    const date = new Date(deadline);
    if (date <= new Date()) {
        return res.status(400).json({ message: "Deadline can't be in the past." });
    }

    const user = await User.findOne({
        _id: userId,
        deleted: false
    });

    if (!user) {
        return res.status(400).json({ message: "Provided user doesn't exist." });
    }

    const isExistingLibrarian = await existLibrarian(librarianCreated);

    if (isExistingLibrarian === "Provide librarian full name!") {
        return res.status(400).json({ message: "Provide librarian full name!" });
    }

    if (isExistingLibrarian === "Provided librarian doesn't exist.") {
        return res.status(400).json({ message: "Provided librarian doesn't exist." });
    }

    try {
        const rentInput : RentInput = {
            dateCreated: new Date(),
            dateUpdated: new Date(),
            deadline,
            user,
            deleted: false,
            librarianCreated: isExistingLibrarian,
            librarianUpdated: isExistingLibrarian
        };

        const rentCreated = await Rent.create(rentInput);

        return res.status(201).json({ rent: rentCreated });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error." });
    }
};

export { createRent };