import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getTicketTypesController } from "@/controllers/tickets-controller";

const ticketsRouter = Router();

ticketsRouter.all("/*", authenticateToken);
ticketsRouter.get("/types", getTicketTypesController);

export { ticketsRouter };
