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

    const { deadline, user, librarianCreated } = req.body;

    if (!deadline || !user || !librarianCreated) {
        return res.status(400).json({ message: "Missing values!" });
    }

    const date = new Date(deadline);
    if (date <= new Date()) {
        return res.status(400).json({ message: "Deadline can't be in the past." });
    }

    const u = await User.findOne({
        _id: user,
        deleted: false
    });

    if (!u) {
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
            user: u,
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

/**
 * @route PUT /rent/:id
 * @desc Update a rent
 * @return {Object} rent
 */

const updateRent = async(req: Request, res: Response) => {

    const id = req.params.id;
    const { deadline, librarianUpdated, user } = req.body;
    const rent = await Rent.findById(id);

    if (!librarianUpdated) {
        return res.status(400).json({ message: "Missing values" });
    }

    if (!rent) {
        return res.status(400).json({ message: "Rent with provided ID doesn't exist" });
    }

    const date = new Date(deadline);
    if (date <= new Date()) {
        return res.status(400).json({ message: "Deadline can't be in the past." });
    }

    const isExistingLibrarian = await existLibrarian(librarianUpdated);

    if (isExistingLibrarian === "Provide librarian full name!") {
        return res.status(400).json({ message: "Provide librarian full name!" });
    }

    if (isExistingLibrarian === "Provided librarian doesn't exist.") {
        return res.status(400).json({ message: "Provided librarian doesn't exist." });
    }

    const u = await User.findOne({
        _id: user,
        deleted: false
    });

    if (!u) {
        return res.status(400).json({ message: "Provided user doesn't exist." });
    }

    try {
        const rentInput : RentInput = {
            dateCreated: rent.dateCreated,
            dateUpdated: new Date(),
            deadline: !deadline ? rent.deadline : deadline,
            user: !u ? rent.user : u,
            deleted: rent.deleted,
            librarianCreated: rent.librarianCreated,
            librarianUpdated: isExistingLibrarian
        };

        const updatedRent = await Rent.findByIdAndUpdate({ _id: id }, { $set: rentInput, $inc: { __v: 1 } }, { new: true });

        return res.status(200).json({ rent: updatedRent });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }

};

/**
 * @route GET /rent/:id
 * @desc GET a rent
 * @return {Object} rent
 */

const getRent = async(req: Request, res: Response) => {

    const id = req.params.id;
    const rent = await Rent.findById(id);

    if (!rent) {
        return res.status(400).json({ message: "Rent with provided ID doesn't exist" });
    }

    return res.status(200).json({ rent: rent });
};

/**
 * @route GET /rents
 * @desc GET all rents
 * @return {Object} rent
 */

const getAllRents = async(req:Request, res:Response) => {

    const { dateCreated, deadline, user, librarianCreated } = req.query;

    let rents = await Rent.find();

    if (librarianCreated) {
        const isExistingLibrarian = await existLibrarian(librarianCreated.toString());

        if (isExistingLibrarian === "Provide librarian full name!") {
            return res.status(400).json({ message: "Provide librarian full name!" });
        }

        rents = rents.filter(r => r.librarianCreated.firstName.concat(" ", r.librarianCreated.lastName) == librarianCreated);
    }
    if (user) {
        rents = rents.filter(r => r.user._id == user);
    }
    if (deadline) {
        const date = new Date(deadline.toString());
        rents = rents.filter(r => r.deadline.getDate() == date.getDate() && 
            r.deadline.getMonth() == date.getMonth() && r.deadline.getFullYear() == date.getFullYear());
    }
    if (dateCreated) {
        const date = new Date(dateCreated.toString());
        rents = rents.filter(r => r.dateCreated.getDate() == date.getDate() && 
            r.dateCreated.getMonth() == date.getMonth() && r.dateCreated.getFullYear() == date.getFullYear());
    }

    if (Array.isArray(rents) && rents.length === 0) {
        return res.status(204).json({});
    }

    return res.status(200).json({ rents: rents });
};

/**
 * @route DELETE /rent/:id
 * @desc DELETE a rent
 * @return {Object} rent
 */

const deleteRent = async(req: Request, res: Response) => {

    const id = req.params.id;
    const rent = await Rent.findById(id);

    if (!rent) {
        return res.status(400).json({ message: "Rent with provided ID doesn't exist" });
    }

    if (rent.deleted) {
        return res.status(400).json({ message: "Rent already deleted" });
    }

    const deletedRent = await Rent.findByIdAndUpdate({ _id: id }, { $set: { deleted: true }, $inc: { __v: 1 } }, { new: true });

    return res.status(200).json({ rent: deletedRent });
};

export { createRent, updateRent, getRent, getAllRents, deleteRent };