import axiosClient from "./axiosClient.js";

class Cart {
    getCartById = (id) => {
        let url = `/cart/${id}`;
        return axiosClient.get(url);
    };
    deleteProductById = (id) => {
        let url = `cart/idProduct/${id}`;
        return axiosClient.delete(url);
    };
    addCart = (cart) => {
        let url = "/cart";
        return axiosClient.post(url, cart);
    };
    updateCart = (cart) => {
        let url = "/cart";
        return axiosClient.put(url, cart);
    };
}
const cartsAPI = new Cart();

export default cartsAPI;
