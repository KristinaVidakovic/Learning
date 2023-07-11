import { Router } from "express";
import { createRent, getAllRents, getRent, updateRent } from "../controllers/rent.controller";

const rentRoute = () => {
    const route = Router();

    route.post("/rent", createRent);
    route.put("/rent/:id", updateRent);
    route.get("/rent/:id", getRent);
    route.get("/rents", getAllRents);

    return route;
};

export { rentRoute };