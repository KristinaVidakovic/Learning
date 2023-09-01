import { Request, Response } from "express";
import { Book } from "../models/book.model";
import { Rent } from "../models/rent.model";
import { RentItem, RentItemInput } from "../models/rent-item.model";
import { existLibrarian } from "./librarian.controller";

/**
 * @route POST /rent_item
 * @desc Create a rent item
 * @return {Object} rent item
 */

const createRentItem = async(req: Request, res: Response) => {

    const { rent, book, librarianCreated } = req.body;

    if (!rent || !book || !librarianCreated) {
        return res.status(400).json({ message: "Missing values" });
    }

    const isExistingLibrarian = await existLibrarian(librarianCreated);

    if (isExistingLibrarian === "Provide librarian full name!") {
        return res.status(400).json({ message: "Provide librarian full name!" });
    }

    if (isExistingLibrarian === "Provided librarian doesn't exist.") {
        return res.status(400).json({ message: "Provided librarian doesn't exist." });
    }

    const b = await Book.findById(book);
    if (!b || b.deleted) {
        return res.status(400).json({ message: "Provided book ID doesn't exist" });
    }

    const r = await Rent.findById(rent);
    if (!r || r.deleted) {
        return res.status(400).json({ message: "Provided rent ID doesn't exist" });
    }

    const rentItem = await RentItem.findOne({
        rent: r._id,
        book: b,
        deleted: false
    });
    if (rentItem) {
        return res.status(400).json({ message: "Provided rent item alreay exist" });
    }

    try {
        b.occupied = true;
        b.librarianUpdated = isExistingLibrarian;
        b.dateUpdated = new Date();
        await Book.findOneAndUpdate({ _id: b._id }, { $set: b }, { new: true });

        const rentItemInput : RentItemInput = {
            rent,
            book: b,
            deleted: false
        };

        const rentItemCreated = await RentItem.create(rentItemInput);

        r.items.push(rentItemCreated);
        r.librarianUpdated = isExistingLibrarian;
        r.dateUpdated = new Date();
        await Rent.findOneAndUpdate({ _id: r._id }, { $set: r }, { new: true });

        return res.status(201).json({ rentItem: rentItemCreated });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }

};

/**
 * @route PUT /rent_item/:id
 * @desc Update a rent item
 * @return {Object} rent item
 */

const updateRentItem = async(req: Request, res: Response) => {

    const id = req.params.id;
    const { book, librarianUpdated } = req.body;
    const rentItem = await RentItem.findById(id);

    if(!rentItem) {
        return res.status(400).json({ message: "Provided rent item ID doesn't exist" });
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

    const b = await Book.findById(book);

    if (book) {
        if (!b || b.deleted) {
            return res.status(400).json({ message: "Provided book ID doesn't exist" });
        }
    }

    const r = await Rent.findById(rentItem.rent);

    try {
        const rentItemInput : RentItemInput = {
            rent: rentItem.rent,
            book: !book ? rentItem.book : b,
            deleted: rentItem.deleted
        }
        
        const rentItemUpdated = await RentItem.findOneAndUpdate({ _id: id }, { $set: rentItemInput }, { new: true });
        
        const idex = r.items.findIndex(item => item.id = id);
        r.items.splice(idex, 1, rentItemUpdated);
        r.dateUpdated = new Date();
        r.librarianUpdated = isExistingLibrarian;
        await Rent.findOneAndUpdate({ _id: r._id }, { $set: r }, { new: true });

        return res.status(200).json({ rent_item: rentItemUpdated });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }

};

export { createRentItem, updateRentItem };