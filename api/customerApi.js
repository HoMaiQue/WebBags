import axiosClient from "./axiosClient.js";

class Customer {
    login = (account) => {
        try {
            let url = "/customer/login";
            return axiosClient.post(url, account);
        } catch (e) {
            console.log(e);
        }
    };
}
const customersAPI = new Customer();

export default customersAPI;
