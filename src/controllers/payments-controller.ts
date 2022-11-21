import { Response } from "express";
import httpStatus from "http-status";
import { AuthenticatedRequest } from "@/middlewares";
import { PaymentData } from "@/protocols";
import paymentsService from "@/services/payments-service";

export async function postPayment(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const paymentData = req.body as PaymentData;

  try{
    const payment = await paymentsService.postPayment(userId, paymentData);
    return res.status(httpStatus.OK).send(payment);
  }catch(error) {
    if(error.name === "UnauthorizedError") {
      return res.status(httpStatus.UNAUTHORIZED).send(error);
    }
    return res.status(httpStatus.NOT_FOUND).send(error);
  }
}
