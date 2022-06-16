import billApi from "../api/billApi.js";
import Toast from "../common/toast.js";

const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });

let value = params.id;

const getBillDetailById = async (id) => {
    try {
        const result = await billApi.getBillDetailByIdBill(id);
        console.log(result);
        const listBillDetails = document.querySelector(".info-bill-detail")
        const innerResult = result.map((item) =>{
            return `<tr>
            <td>${item.idBill}</td>
            <td>${item.idProduct}</td>
            <td><span class="text-muted">${item.quantity}</span>
            </td>

            <td>${item.price}</td>
        </tr>`
        })
        listBillDetails.innerHTML = innerResult.join("");
    }
    catch (err) {
        console.log(err);
    }
}
getBillDetailById(value)