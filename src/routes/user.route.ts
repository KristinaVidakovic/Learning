import { Router } from "express";
import { createUser, getAllUsers, getUser, updateUser } from "../controllers/user.controller";

const userRoute = () => {
    const router = Router();

    router.post("/user", createUser);
    router.put("/user/:id", updateUser);
    router.get("/user/:id", getUser);
    router.get("/users", getAllUsers);

    return router;
};

export {userRoute};