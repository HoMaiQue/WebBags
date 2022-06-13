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

    changePassword = (account) => {
        try {
            let url = "/customer/change_pass";
            return axiosClient.put(url,account);
        } catch (e) {
            console.log(e);
        }
    };
    checkUser = (userName) => {
        let url = `/customer/username/${userName}`;
        return axiosClient.get(url);
    };
}
const customersAPI = new Customer();

export default customersAPI;
