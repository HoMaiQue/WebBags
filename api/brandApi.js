import axiosClient from "./axiosClient.js";

class Brand {
    getAllBrand = () => {
        let url = "/brand";
        return axiosClient.get(url);
    };
}
const brandApi = new Brand();

export default brandApi;