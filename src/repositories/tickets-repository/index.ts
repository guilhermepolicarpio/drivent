import { prisma } from "@/config";

async function findTicketTypes() {
  return prisma.ticketType.findMany();
}

const ticketRepository={
  findTicketTypes
};

export default ticketRepository;
