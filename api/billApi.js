import axiosClient from "./axiosClient.js";

class Bill {
    createBill = (bill) => {
        let url = "/bill";
        return axiosClient.post(url, bill);
    };
    createBillDetail = (billDetail) => {
        let url = "/bill_detail";
        return axiosClient.post(url, billDetail);
    }
    getBillByIdUser = (id)=> {
        let url = `/bill/id_user/${id}`
        return axiosClient.get(url)
    }
    getBillDetailByIdBill = (id)=> {
        let url = `/bill_detail/${id}`
        return axiosClient.get(url)
    }
}
const billApi = new Bill();

export default billApi;
