import axiosClient from "./axiosClient.js";

class Products {
    getAllProduct = () => {
        let url = "/product";
        return axiosClient.get(url);
    };
    getProductById = (id) => {
        let url = `/product/${id}`;
        return axiosClient.get(url);
    }
    deleteProductById = (id) => {
        let url = `/product/${id}`
        return axiosClient.delete(url);
    }
}
const productsAPI = new Products();

export default productsAPI;
