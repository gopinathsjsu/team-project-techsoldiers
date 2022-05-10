import axiosClient from "./axios";

export function getRoomsByHotel(hotelID, startDate, endDate){

    return axiosClient.get(`api/room/hotel/${hotelID}/rooms?startDate=${startDate}&endDate=${endDate}`);
}

export function getRoomPriceFinal(hotelID, roomID, startDate, endDate){

    return axiosClient.get(`api/pricing/hotelroom/${hotelID}/${roomID}?startDate=${startDate}&endDate=${endDate}`)
}