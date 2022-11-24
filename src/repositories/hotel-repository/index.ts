import { prisma } from "@/config";

async function getAllHotels() {
  return prisma.hotel.findMany();
}

async function getHotelById(id: number) {
  return prisma.hotel.findUnique({
    where: { id }
  });
}

async function getHotelRooms(hotelId: number) {
  return prisma.room.findMany({
    where: { hotelId }
  });
}
const hotelsRepository = {
  getAllHotels,
  getHotelById,
  getHotelRooms
};
  
export default hotelsRepository;
