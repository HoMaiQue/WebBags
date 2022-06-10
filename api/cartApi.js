import axiosClient from "./axiosClient.js";

class Cart {
    addCart = (cart) => {
        try {
            let url = "/cart";
            return axiosClient.post(url, cart);
        } catch (e) {
            console.log(e);
        }
    };
}
const CartAPI = new Cart();

export default CartAPI;
