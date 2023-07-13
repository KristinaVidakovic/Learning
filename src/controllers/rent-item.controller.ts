import { Request, Response } from "express";

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
};

export { createRentItem };