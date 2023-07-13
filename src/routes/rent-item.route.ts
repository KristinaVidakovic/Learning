import { Router } from "express";
import { createRentItem } from "../controllers/rent-item.controller";

const rentItemRoute = () => {
    const route = Router();

    route.post("/rent_item", createRentItem);

    return route;
};

export { rentItemRoute };