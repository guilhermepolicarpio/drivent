import hotelsRepository from "@/repositories/hotel-repository";
import { Hotel, Room } from "@prisma/client";

async function getHotels() {
  const ticketTypes = await hotelsRepository.getAllHotels();
  return ticketTypes;
}

const hotelsService ={
  getHotels
};

export default hotelsService;
