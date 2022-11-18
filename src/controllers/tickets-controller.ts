import { Response } from "express";
import httpStatus from "http-status";
import { AuthenticatedRequest } from "@/middlewares";
import { getTicketTypes } from "@/services/tickets-service";

export async function getTicketTypesController(req: AuthenticatedRequest, res: Response) {
  try{
    const ticketTypes = await getTicketTypes();
    return res.status(httpStatus.OK).send(ticketTypes);
  }catch(error) {
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}
