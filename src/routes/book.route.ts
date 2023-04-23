import { Router } from "express";
import { createBook } from "../controllers/book.controller";

const bookRoute = () => {
    const router = Router();

    router.post("/book", createBook);

    return router;
};

export {bookRoute};