import { Router } from "express";
import { createMembership, updateMembership } from "../controllers/membership.controller";

const membershipRoute = () => {
    const route = Router();

    route.post("/membership", createMembership);
    route.put("/membership/:id", updateMembership);

    return route;
};

export {membershipRoute};