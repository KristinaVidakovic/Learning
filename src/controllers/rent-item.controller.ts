import { Request, Response } from "express";
import { Book } from "../models/book.model";
import { Rent } from "../models/rent.model";
import { RentItem, RentItemInput } from "../models/rent-item.model";

/**
 * @route POST /rent_item
 * @desc Create a rent item
 * @return {Object} rent item
 */

const createRentItem = async(req: Request, res: Response) => {

    const { rent, book, quantity } = req.body;

    if (!rent || !book || !quantity) {
        return res.status(400).json({ message: "Missing values" });
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
        const rentItemInput : RentItemInput = {
            quantity,
            rent,
            book: b,
            deleted: false
        };

        const rentItemCreated = await RentItem.create(rentItemInput);

        r.items.push(rentItemCreated);
        await Rent.findByIdAndUpdate({ _id: r._id }, { $set: { items: r.items }, $inc: { __v: 1 } }, { new: true });

        return res.status(201).json({ rentItem: rentItemCreated });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }

};

export { createRentItem };