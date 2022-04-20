import axiosClient from "./axios";

export function getMyBookings(){

    return axiosClient.get('api/booking');
    
}