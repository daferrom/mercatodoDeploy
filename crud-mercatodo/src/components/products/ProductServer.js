const API_URL = "https://apimercatodo.herokuapp.com/api/products/"

export const listProducts = async () =>{
    return await fetch(API_URL)
};