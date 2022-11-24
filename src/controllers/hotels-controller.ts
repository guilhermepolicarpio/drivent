import hotelsService from "@/services/hotels-service";
import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";
import httpStatus from "http-status";

export async function getHotels(req: AuthenticatedRequest, res: Response) {
  try{
    const hotels = await hotelsService.getHotels();
    return res.status(httpStatus.OK).send(hotels);
  }catch(error) {
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function getHotelRooms(req: AuthenticatedRequest, res: Response) {
  const hotelId = Number(req.params.hotelId);
  
  try{
    const hotelRooms = await hotelsService.getHotelRooms(hotelId);
    return res.status(httpStatus.OK).send(hotelRooms);
  }catch(error) {
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}
