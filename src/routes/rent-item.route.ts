import { Router } from "express";
import { createRentItem, updateRentItem } from "../controllers/rent-item.controller";

const rentItemRoute = () => {
    const route = Router();

    route.post("/rent_item", createRentItem);
    route.put("/rent_item/:id", updateRentItem);

    return route;
};

export { rentItemRoute };