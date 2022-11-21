import { notFoundError } from "@/errors";
import { PaymentData } from "@/protocols";
import paymentsRepository, { NewPayment } from "@/repositories/payments-repository";
import ticketRepository from "@/repositories/tickets-repository";

async function postPayment(userId: number, paymentData: PaymentData) {
  const ticket = await ticketRepository.findTicketById(paymentData.ticketId);

  if(!ticket)
    throw notFoundError();

  const ticketType = await ticketRepository.findTicketsTypeById(ticket.ticketTypeId);

  const paymentParams: NewPayment ={
    ticketId: paymentData.ticketId,
    value: ticketType.price,
    cardIssuer: paymentData.cardData.issuer,
    cardLastDigits: String(paymentData.cardData.number).slice(-4),
  };

  const addPayment = await paymentsRepository.postPayment(paymentParams);

  await ticketRepository.updateTicket(ticket.id);

  return addPayment;
}

const paymentsService = {
  postPayment
};
  
export default paymentsService;
