import { notFoundError } from "@/errors";
import hotelsRepository from "@/repositories/hotel-repository";
import { Hotel, Room } from "@prisma/client";

async function getHotels() {
  const ticketTypes = await hotelsRepository.getAllHotels();
  return ticketTypes;
}

async function getHotelRooms(hotelId: number) {
  const hotel = await hotelsRepository.getHotelById(hotelId);
  if(!hotel)
    throw notFoundError();
}

const hotelsService ={
  getHotels,
  getHotelRooms
};

export default hotelsService;
