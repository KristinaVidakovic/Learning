import { Request, Response } from "express";
import { Librarian, LibrarianInput } from "../models/librarian.model";

/**
 * @route POST /librarian
 * @desc Create a librarian 
 * @return {Object} librarian
 */

const createLibrarian = async (req: Request, res: Response) => {
  const { firstName, lastName } = req.body;

  if (firstName == '' || lastName == '' || firstName == null || lastName == null) {
    return res.status(400).json({ message: "Missing first name and/or last name!" });
  }

  const lib = await Librarian.findOne({
    "firstName": req.body.firstName,
    "lastName": req.body.lastName
  });

  if (lib != null) {
    return res.status(400).json({ message: "Librarian with the provided data already exist." });
  }
  
  const librarianInput: LibrarianInput = {
    firstName,
    lastName
  };

  const librarianCreated = await Librarian.create(librarianInput);

  return res.status(201).json({ librarian: librarianCreated });
}

export {createLibrarian};