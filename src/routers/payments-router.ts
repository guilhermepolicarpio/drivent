import { Router } from "express";
import { authenticateToken, validateBody } from "@/middlewares";
import { postPayment } from "@/controllers/payments-controller";

const paymentsRouter = Router();

paymentsRouter
  .all("/*", authenticateToken)
  .post("/process", postPayment);

export { paymentsRouter };
