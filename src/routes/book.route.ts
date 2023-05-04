import { Router } from "express";
import { createBook, deleteBook, getAllBooks, getBook, updateBook } from "../controllers/book.controller";

const bookRoute = () => {
    const router = Router();

    router.post("/book", createBook);
    router.put("/book/:id", updateBook);
    router.get("/book/:id", getBook);
    router.get("/books", getAllBooks);
    router.delete("/book/:id", deleteBook);

    return router;
};

export {bookRoute};