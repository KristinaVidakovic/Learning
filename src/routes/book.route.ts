import { Router } from "express";
import { createBook, getAllBooks, getBook, updateBook } from "../controllers/book.controller";

const bookRoute = () => {
    const router = Router();

    router.post("/book", createBook);
    router.put("/book/:id", updateBook);
    router.get("/book/:id", getBook);
    router.get("/books", getAllBooks);

    return router;
};

export {bookRoute};