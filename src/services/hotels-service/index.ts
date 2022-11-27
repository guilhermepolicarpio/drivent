import { notFoundError } from "@/errors";
import { forbidenError } from "@/errors/forbidden-error";
import { paymentError } from "@/errors/payment-error";
import hotelsRepository from "@/repositories/hotel-repository";
import ticketRepository from "@/repositories/ticket-repository";

async function getHotels(userId: number) {
  const ticket = await ticketRepository.findTicketByUserId(userId);

  if(!ticket || !ticket.TicketType.includesHotel)
    throw forbidenError();

  if(ticket.status !== "PAID")
    throw paymentError();

  const hotels = await hotelsRepository.getAllHotels();
  
  return hotels;
}

async function getHotelRooms(userId: number, hotelId: number) {
  const ticket = await ticketRepository.findTicketByUserId(userId);

  if(!ticket || ticket.TicketType.includesHotel) {
    throw forbidenError ();
  }
  
  const hotel = await hotelsRepository.getHotelById(hotelId);
  if(!hotel)
    throw notFoundError();

  const hotelRooms = await hotelsRepository.getHotelRooms(hotelId);
  return hotelRooms;
}

const hotelsService ={
  getHotels,
  getHotelRooms
};

export default hotelsService;
