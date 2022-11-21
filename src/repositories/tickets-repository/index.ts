import { prisma } from "@/config";
import { TicketStatus } from "@prisma/client";

async function findTicketTypes() {
  return prisma.ticketType.findMany();
}

async function findUserTicket(enrollmentId: number) {
  return prisma.ticket.findFirst({
    where: { enrollmentId }
  });
}

async function findTicketsTypeById(id: number) {
  return prisma.ticketType.findFirst({
    where: { id }
  });
}

async function createTicket(enrollmentId: number, ticketTypeId: number,) {
  return prisma.ticket.create({
    data: {
      "ticketTypeId": ticketTypeId,
      "enrollmentId": enrollmentId,
      "status": TicketStatus.RESERVED
    }
  });
}

async function findTicketById( id: number) {
  return prisma.ticket.findFirst({
    where: { id }
  });
}

const ticketRepository={
  findTicketTypes,
  findUserTicket,
  findTicketsTypeById,
  createTicket,
  findTicketById
};

export default ticketRepository;