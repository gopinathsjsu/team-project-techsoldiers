import axiosClient from "./axios";

export function getRoomTypeByHotelId(id){

    return axiosClient.get('api/room/hotel/'+id);
    
}