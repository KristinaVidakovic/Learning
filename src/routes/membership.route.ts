import { Router } from "express";
import { createMembership, getMemberships, updateMembership } from "../controllers/membership.controller";

const membershipRoute = () => {
    const route = Router();

    route.post("/membership", createMembership);
    route.put("/membership/:id", updateMembership);
    route.get("/memberships", getMemberships);

    return route;
};

export {membershipRoute};