import axiosClient from "./axios";

export function getAmenityByHotelId(){

    return axiosClient.get('api/amenities');
    
}