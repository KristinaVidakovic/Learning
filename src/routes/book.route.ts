import { Router } from "express";
import { createBook, getBook, updateBook } from "../controllers/book.controller";

const bookRoute = () => {
    const router = Router();

    router.post("/book", createBook);
    router.put("/book/:id", updateBook);
    router.get("/book/:id", getBook);

    return router;
};

export {bookRoute};