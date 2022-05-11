import axiosClient from "./axios";

export function getMyBookings(token){
    return axiosClient.get('api/booking', {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });
}

export function updateMyBooking(payload){
    console.log(payload.token)
    return axiosClient.put('api/booking/update/' + payload.id, payload.data, {
        headers: {
            'Authorization': `Bearer ${payload.token}`,
        }
    });
}

export function cancelMyBooking(id){
    return axiosClient.put('api/booking/cancel' + id);
    
}

export function createBookings(payload){
    
    return axiosClient.post('api/booking', payload.data, {
        headers: {
            'Authorization': `Bearer ${payload.token}`,
        }
    });
}




