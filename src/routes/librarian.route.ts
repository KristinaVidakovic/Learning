import { Router } from "express";
import { createLibrarian } from "../controllers/librarian.controller";

const librarianRoute = () => {
  const router = Router();

  router.post("/librarian", createLibrarian);

  return router;
};

export {librarianRoute};