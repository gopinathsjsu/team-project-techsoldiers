import axiosClient from "./axios";

export function getMyBookings(){
    return axiosClient.get('api/booking');
}

export function updateMyBooking(){
    return axiosClient.put('api/booking');
}

export function cancelMyBooking(id){
    return axiosClient.put('api/booking' + id);
    
}

export function createBookings(){

    return axiosClient.post('api/booking')
}