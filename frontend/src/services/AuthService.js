import axiosClient from "./axios";

export function login(payload){

    return axiosClient.post('api/auth/login',payload);
    
}

export function register(payload){
    return axiosClient.post('api/auth/register', payload);
}

export function confirm(payload){
    return axiosClient.post('api/auth/confirm', payload);
}