import axiosClient from "./axios";

export function getMyBookings(){

    return axiosClient.get('api/booking');
    
}

export function createBookings(){

    return axiosClient.post('api/booking')
}