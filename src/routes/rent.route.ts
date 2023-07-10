import { Router } from "express";
import { createRent, updateRent } from "../controllers/rent.controller";

const rentRoute = () => {
    const route = Router();

    route.post("/rent", createRent);
    route.put("/rent/:id", updateRent);

    return route;
};

export { rentRoute };