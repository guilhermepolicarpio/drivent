import { Response } from "express";
import httpStatus from "http-status";
import { AuthenticatedRequest } from "@/middlewares";
import ticketServices  from "@/services/tickets-service";

export async function getTicketTypes(req: AuthenticatedRequest, res: Response) {
  try{
    const ticketTypes = await ticketServices.getTicketTypes();
    return res.status(httpStatus.OK).send(ticketTypes);
  }catch(error) {
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function getTicket(req: AuthenticatedRequest, res: Response ) {
  const { userId } = req;

  try{
    const ticket = await ticketServices.getTicketTypesByTypeId(userId);
    return res.status(httpStatus.OK).send(ticket);
  }catch(error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function postTicket(req: AuthenticatedRequest, res: Response ) {
  const { userId } = req;
  const { ticketTypeId } = req.body;

  console.log(userId);
  console.log(ticketTypeId);

  try{
    const newTicket = await ticketServices.postTicket(userId, ticketTypeId);
    return res.status(httpStatus.CREATED).send(newTicket);
  }catch(error) {
    console.log(error);
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
