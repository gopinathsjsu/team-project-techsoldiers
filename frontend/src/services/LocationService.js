import axiosClient from "./axios";

export function getLocations() {
    return new Promise((resolve, reject) => {
      axiosClient
        .get("/api/location")
        .then((res) =>{
            const data = [];
            res.data.map((item, key) => {
                data.push({ value: String(item.id) , label: item.city +", "+ item.country, key: key })
            })
            resolve(data)
        })
        .catch((err) => reject(err));
    });
  }