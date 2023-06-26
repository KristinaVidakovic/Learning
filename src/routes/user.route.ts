import { Router } from "express";
import { createUser } from "../controllers/user.controller";

const userRoute = () => {
    const router = Router();

    router.post("/user", createUser);

    return router;
};

export {userRoute};