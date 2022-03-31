import axiosClient from "./axios";

export function getHotelsByLocationId(id){

    return axiosClient.get('/hotel/location/'+id);
    
}

// export function register(payload){
//     return axiosClient.post('/auth/register', payload);
// }

// export function confirm(payload){
//     return axiosClient.post('/auth/confirm', payload);
// }