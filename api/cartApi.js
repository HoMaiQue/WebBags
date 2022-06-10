import axiosClient from "./axiosClient.js";

class Cart {
    getCartById = (id) => {
        let url = `/cart/${id}`;
        return axiosClient.get(url);
    };
    deleteProductById = (id) => {
        let url = `cart/idProduct/${id}`;
        return axiosClient.delete(url);
    }
}
const cartsAPI = new Cart();

export default cartsAPI;
