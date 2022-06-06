import axiosClient from "./axiosClient.js";

class Products {
    getAllProduct = () => {
        let url = "/product";
        return axiosClient.get(url);
    };
}
const productsAPI = new Products();

export default productsAPI;
