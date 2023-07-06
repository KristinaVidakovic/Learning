import { Router } from "express";
import { createUser, updateUser } from "../controllers/user.controller";

const userRoute = () => {
    const router = Router();

    router.post("/user", createUser);
    router.put("/user/:id", updateUser);

    return router;
};

export {userRoute};