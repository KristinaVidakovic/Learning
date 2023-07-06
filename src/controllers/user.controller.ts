import { Request, Response } from "express";
import { User, UserInput } from "../models/user.model";
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

        const user = await User.findOne({
            email: email
        });

        if (user) {
            return res.status(400).json({ message: "User with that email already exists." });
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
            deleted: false
        };

        const userCreated = await User.create(userInput);

        return res.status(201).json({ user: userCreated });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error!" });
    }
};

/**
 * @route PUT /user/:id
 * @desc Update a user 
 * @return {Object} user
 */

const updateUser = async(req: Request, res: Response) => {

    const id = req.params.id;
    const { firstName, lastName, email, phone, librarianUpdated, membership } = req.body;

    const user = await User.findById(id);

    if (!user) {
        return res.status(400).json({ message: "User with that ID doesn't exist." });
    }

    if (!librarianUpdated) {
        return res.status(400).json({ message: "Missing values!" });
    }

    const isExistingLibrarian = await existLibrarian(librarianUpdated);

    if (isExistingLibrarian === "Provide librarian full name!") {
        return res.status(400).json({ message: "Provide librarian full name!" });
    }

    if (isExistingLibrarian === "Provided librarian doesn't exist.") {
        return res.status(400).json({ message: "Provided librarian doesn't exist." });
    }

    const mem = await Membership.findOne({
        type: membership
    });
    
    if (!mem) {
        return res.status(400).json({ message: "Provided membership doesn't exist." });
    }

    try {
        const userInput: UserInput = {
            firstName: !firstName ? user.firstName : firstName,
            lastName: !lastName ? user.lastName : lastName,
            email: !email ? user.email : email,
            phone: !phone ? user.phone : phone,
            dateCreated: user.dateCreated,
            dateUpdated: new Date(),
            librarianCreated: user.librarianCreated,
            librarianUpdated: librarianUpdated,
            membership: !membership ? user.membership : membership,
            deleted: false
        };
    
        const userUpdated = await User.findOneAndUpdate({_id : id}, {$set : userInput, $inc: {__v: 1}}, {new: true});

        return res.status(200).json({ user: userUpdated });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error." });
    }
}; 

export {createUser, updateUser};