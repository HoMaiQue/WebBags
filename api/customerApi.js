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
    register = (account) => {
        try {
            let url = "/customer";
            return axiosClient.post(url, account);
        } catch (e) {
            console.log(e);
        }
    };
    getCustomerById = (id) => {
        let url = `/customer/${id}`;
        return axiosClient.get(url);
    };
    change = (customer,id) => {
        try {
            let url = `/customer/info/${id}`;
            return axiosClient.put(url, customer);
        } catch (e) {
            console.log(e);
        }
    };
}
const customersAPI = new Customer();

export default customersAPI;
