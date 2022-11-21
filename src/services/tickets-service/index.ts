import  ticketRepository  from "@/repositories/tickets-repository";
import { Ticket, TicketType } from "@prisma/client";
import enrollmentRepository from "@/repositories/enrollment-repository";
import { notFoundError } from "@/errors";
import userRepository from "@/repositories/user-repository";

async function getTicketTypes() {
  const ticketTypes = await ticketRepository.findTicketTypes();
  return ticketTypes;
}

async function getTicketTypesByTypeId(userId: number) {
  const enrollmentId = await enrollmentRepository.findWithAddressByUserId(userId);
  const userTicket = await ticketRepository.findUserTicket(enrollmentId.id);

  if(!userTicket)
    throw notFoundError();

  const ticketType = await ticketRepository.findTicketsTypeById(userTicket.ticketTypeId);

  return { ...userTicket, TicketType: ticketType };
}

async function postTicket(userId: number, ticketTypeId: number) {
  const user = userRepository.findById(userId);

  if(!user) throw notFoundError();

  const enrollmentId = await enrollmentRepository.findEnrollment(userId);
  const ticket = await ticketRepository.createTicket(enrollmentId.id, ticketTypeId);

  if(!ticket) {
    throw notFoundError(); 
  }

  const ticketType = await ticketRepository.findTicketsTypeById(ticket.ticketTypeId);

  return { ...ticket, TicketType: ticketType };
}

const ticketServices ={
  getTicketTypes,
  getTicketTypesByTypeId,
  postTicket
};
export default ticketServices;
