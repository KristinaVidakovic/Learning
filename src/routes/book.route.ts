import { Router } from "express";
import { createBook, updateBook } from "../controllers/book.controller";

const bookRoute = () => {
    const router = Router();

    router.post("/book", createBook);
    router.put("/book/:id", updateBook);

    return router;
};

export {bookRoute};