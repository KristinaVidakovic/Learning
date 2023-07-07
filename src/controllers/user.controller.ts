import { Request, Response } from "express";
import { User, UserInput } from "../models/user.model";
import { Membership } from "../models/membership.model";
import { existLibrarian } from "./librarian.controller";

/**
 * @route POST /user
 * @desc Create a user 
 * @return {Object} user
 */

const createUser = async (req: Request, res: Response) => {

    const { firstName, lastName, email, phone, librarianCreated, membership } = req.body;

    if (!firstName || !lastName || !email || !phone || !librarianCreated || !membership) {
        return res.status(400).json({ message: "Missing values!" });
    }

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
        type: membership,
        deleted: false
    });

    if (!mem) {
        return res.status(400).json({ message: "Provided membership type doesn't exist." });
    }

    try {
        const userInput: UserInput = {
            firstName,
            lastName,
            email,
            phone,
            dateCreated: new Date(),
            dateUpdated: new Date(),
            librarianCreated: isExistingLibrarian,
            librarianUpdated: isExistingLibrarian,
            membership: mem,
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

const updateUser = async (req: Request, res: Response) => {

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
        type: membership,
        deleted: false
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
            librarianUpdated: isExistingLibrarian,
            membership: !membership ? user.membership : mem,
            deleted: user.deleted
        };

        const userUpdated = await User.findOneAndUpdate({ _id: id }, { $set: userInput, $inc: { __v: 1 } }, { new: true });

        return res.status(200).json({ user: userUpdated });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error." });
    }
};

/**
 * @route GET /user/:id
 * @desc Get a user 
 * @return {Object} user
 */

const getUser = async (req: Request, res: Response) => {

    const id = req.params.id;

    const user = await User.findById(id);

    if (!user) {
        return res.status(400).json({ message: "User with provided ID doesn't exist." });
    }

    try {
        return res.status(200).json({ user: user });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error!" });
    }
};

/**
 * @route GET /users
 * @desc Get all users
 * @return {Object} user
 */

const getAllUsers = async(req: Request, res: Response) => {

    const { firstName, lastName, email, phone, membership, librarianCreated } = req.query;

    let users = await User.find();

    if (firstName) {
        users = users.filter(u => u.firstName == firstName);
    }
    if (lastName) {
        users = users.filter(u => u.lastName == lastName);
    }
    if (email) {
        users = users.filter(u => u.email == email);
    }
    if (phone) {
        users = users.filter(u => u.phone == phone);
    }
    if (membership) {
        users = users.filter(u => u.membership.type == membership);
    }
    if (librarianCreated) {
        const isExistingLibrarian = await existLibrarian(librarianCreated.toString());

        if (isExistingLibrarian === "Provide librarian full name!") {
            return res.status(400).json({ message: "Provide librarian full name!" });
        }

        users = users.filter(u => u.librarianCreated.firstName.concat(" ", u.librarianCreated.lastName) == librarianCreated);
    }

    if (Array.isArray(users) && users.length == 0) {
        return res.status(204).json({});
    }

    return res.status(200).json({ users: users });
};

/**
 * @route DELETE /user/:id
 * @desc Delete a user
 * @return {Object} user
 */

const deleteUser = async(req: Request, res: Response) => {

    const id = req.params.id;

    const user = await User.findById(id);

    if (!user) {
        return res.status(400).json({ message: "User with provided ID doesn't exist." });
    }

    if (user.deleted) {
        return res.status(400).json({ message: "User already deleted." });
    }

    const deletedUser = await User.findByIdAndUpdate({ _id: id }, { $set: { deleted: true }, $inc: { __v: 1 } }, { new: true });

    return res.status(200).json({ user: deletedUser });
};

export { createUser, updateUser, getUser, getAllUsers, deleteUser };