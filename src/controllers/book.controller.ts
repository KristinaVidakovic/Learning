import { Request, Response } from "express";
import { Book, BookInput } from "../models/book.model";
import { Librarian } from "../models/librarian.model";

/**
 * @route POST /book
 * @desc Create a book 
 * @return {Object} book
 */

const createBook = async (req: Request, res: Response) => {
    const { title, ISBN, publisher, publicationYear, author, genre, librarianCreated } = req.body;

    if (!title || !ISBN || !publicationYear || !publisher || !author || !genre || !librarianCreated) {
        return res.status(400).json({ message: "Missing values!" });
    }

    try{
        const name = librarianCreated.split(" ");
        const firstName = name[0];
        const lastName = name[1];

        if (!firstName || !lastName) {
            return res.status(400).json({ message: "Provide librarian full name!" });
        }

        const lib = await Librarian.findOne({
            "firstName": firstName,
            "lastName": lastName
        });
        
        if (!lib) {
            return res.status(400).json({ message: "Provided librarian doesn't exist." });
        }

        const bookInput: BookInput = {
            title,
            ISBN,
            publisher,
            publicationYear,
            author,
            genre,
            occupied: false,
            dateCreated: new Date(),
            dateUpdated: new Date(),
            librarianCreated,
            librarianUpdated: librarianCreated
        };
    
        const bookCreated = await Book.create(bookInput);
    
        return res.status(201).json({ book: bookCreated });
    } catch(err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error!" });
    }
}

export {createBook};