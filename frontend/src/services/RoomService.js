import axiosClient from "./axios";

export function getRoomsByHotel(id){

    return axiosClient.get(`api/room/hotel/${id}`);
}