import { Router } from "express";
import { createRent } from "../controllers/rent.controller";

const rentRoute = () => {
    const route = Router();

    route.post("/rent", createRent);

    return route;
};

export { rentRoute };