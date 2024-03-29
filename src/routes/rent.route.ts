import { Router } from "express";
import { createRent, deleteRent, getAllRents, getRent, updateRent } from "../controllers/rent.controller";

const rentRoute = () => {
    const route = Router();

    route.post("/rent", createRent);
    route.put("/rent/:id", updateRent);
    route.get("/rent/:id", getRent);
    route.get("/rents", getAllRents);
    route.delete("/rent/:id", deleteRent);

    return route;
};

export { rentRoute };