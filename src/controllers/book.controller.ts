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
            librarianUpdated: librarianCreated,
            deleted: false
        };
    
        const bookCreated = await Book.create(bookInput);
    
        return res.status(201).json({ book: bookCreated });
    } catch(err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error!" });
    }
}

/**
 * @route PUT /book/:id
 * @desc Update a book 
 * @return {Object} book
 */

const updateBook = async (req: Request, res: Response) => {

    const id = req.params.id;
    const { title, ISBN, publisher, publicationYear, author, genre, librarianUpdated } = req.body;

    const book = await Book.findById(id);

    if (!book) {
        return res.status(400).json({ message: "Book with provided ID doesn't exists!" });
    }

    try {
        const name = librarianUpdated.split(" ");
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
            title: !title ? book.title : title,
            ISBN: !ISBN ? book.ISBN: ISBN,
            publisher: !publisher ? book.publisher : publisher,
            publicationYear: !publicationYear ? book.publicationYear : publicationYear,
            author: !author ? book.author : author,
            genre: !genre ? book.genre : genre,
            occupied: book.occupied,
            dateCreated: book.dateCreated,
            dateUpdated: new Date(),
            librarianCreated: book.librarianCreated,
            librarianUpdated: librarianUpdated,
            deleted: book.deleted
        };
    
        const bookUpdated = await Book.findOneAndUpdate({_id : id}, {$set : bookInput, $inc: {__v: 1}}, {new: true});
    
        return res.status(200).json({ book: bookUpdated });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error." });
    }
};

/**
 * @route GET /book/:id
 * @desc Get a book 
 * @return {Object} book
 */

const getBook = async (req: Request, res: Response) => {

    const book = await Book.findById(req.params.id);

    if (!book) {
        return res.status(400).json({ message: "Book with provided ID doesn't exists!" });
    }
  
    return res.status(200).json({ book: book });
};

/**
 * @route GET /books
 * @desc Get all books 
 * @return {Object} book
 */

const getAllBooks = async (req: Request, res: Response) => {

    const { title, publisher, publicationYear, author, genre, occupied, ISBN } = req.query;

    let books = await Book.find();
    
    if (title) {
        books = books.filter(b => b.title == title);
    } 
    if (publisher) {
        books = books.filter(b => b.publisher == publisher);
    }
    if (publicationYear) {
        books = books.filter(b => b.publicationYear == Number(publicationYear));
    }
    if (author) {
        books = books.filter(b => b.author == author);
    }
    if (genre) {
        books = books.filter(b => b.genre == genre);
    }
    if (occupied) {
        books = books.filter(b => b.occupied == (occupied=='true' ? true : false));
    }
    if (ISBN) {
        books = books.filter(b => b.ISBN == ISBN);
    }

    if (Array.isArray(books) && books.length === 0) {
        return res.status(204).json({});
    }
  
    return res.status(200).json({ books: books});
};

/**
 * @route DELETE /book/:id
 * @desc Delete a book
 * @return {Object} book
 */

const deleteBook = async (req: Request, res: Response) => {

    const id = req.params.id;

    const book = await Book.findById(id);

    if (book.deleted==true) {
        return res.status(400).json({ message: "Book already deleted" });
    }

    const deletedBook = await Book.findByIdAndUpdate({_id : id}, {$set : {deleted: true}, $inc: {__v: 1}}, {new: true});

    return res.status(200).json({ deleted: deletedBook });
};

export {createBook, updateBook, getBook, getAllBooks, deleteBook};