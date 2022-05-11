import axiosClient from "./axios";

export function getMyBookings(){
    return axiosClient.get('api/booking');
}

export function updateMyBooking(payload){
    console.log(payload.token)
    return axiosClient.put('api/booking/update/' + payload.id, payload.data, {
        'Authorization': `Bearer ${payload.token}`,
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Expires': '0',
    });
}

export function cancelMyBooking(id){
    return axiosClient.put('api/booking/cancel' + id);
    
}

export function createBookings(){

    return axiosClient.post('api/booking')
}