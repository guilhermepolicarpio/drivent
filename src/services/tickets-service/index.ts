import  ticketRepository  from "@/repositories/tickets-repository";
import { Ticket, TicketType } from "@prisma/client";

export async function getTicketTypes(): Promise<TicketType[]> {
  const ticketTypes = await ticketRepository.findTicketTypes();
  return ticketTypes;
}
