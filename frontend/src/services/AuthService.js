import axiosClient from "./axios";

export function login(payload){

    return axiosClient.post('/auth/login',payload);
    
}

export function register(payload){
    return axiosClient.post('/auth/register', payload);
}

export function confirm(payload){
    return axiosClient.post('/auth/confirm', payload);
}