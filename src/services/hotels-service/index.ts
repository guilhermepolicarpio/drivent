import { notFoundError } from "@/errors";
import { forbidenError } from "@/errors/forbidden-error";
import { paymentError } from "@/errors/payment-error";
import hotelsRepository from "@/repositories/hotel-repository";
import ticketRepository from "@/repositories/ticket-repository";
import { Hotel, Room } from "@prisma/client";

async function getHotels(userId: number) {
  const ticket = await ticketRepository.findTicketByUserId(userId);

  if(!ticket || !ticket.TicketType.includesHotel)
    throw forbidenError();

  if(ticket.status !== "PAID")
    throw paymentError();

  const hotels = await hotelsRepository.getAllHotels();
  
  return hotels;
}

async function getHotelRooms(hotelId: number) {
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
