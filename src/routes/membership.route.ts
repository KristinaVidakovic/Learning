import { Router } from "express";
import { createMembership, deleteMembership, getMemberships, updateMembership } from "../controllers/membership.controller";

const membershipRoute = () => {
    const route = Router();

    route.post("/membership", createMembership);
    route.put("/membership/:id", updateMembership);
    route.get("/memberships", getMemberships);
    route.delete("/membership/:id", deleteMembership)

    return route;
};

export {membershipRoute};