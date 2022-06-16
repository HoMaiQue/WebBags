import billApi from "../api/billApi.js";
import Toast from "../common/toast.js";


const confirmBill = async (id) => {
    try {
        const result = await billApi.comfirmBill(id);
        console.log(result);
    }
    catch (err) {
        console.log(err);
    }
}

const getAllBill = async () => {
    try {
        const result = await billApi.getAllBill();
        console.log(typeof(result[0].dateBill));
        const listBill = document.querySelector(".info-bill")
        const listBillInner = result.map((item) => {
            return `<tr>
            <td><a href="admin-bill-detail.html?id=${item.idBill}">${item.idBill}</a>
            </td>
            <td>${item.idUser}</td>
            <td><span class="text-muted">${item.dateBill.substring(0, 10)}</span>
            </td>

            <td><button type="button" value=${item.idBill} class="btn ${item.status ? "btn-green" : "btn-danger"}" ${item.status ? "disabled" : ""}>${item.status ? "✅Đã xác nhận" : "Chờ xác nhận"}</button></td>
        </tr>`
        })
        listBill.innerHTML = listBillInner.join("");

        // xac nhan
        const listConfirmBill = document.querySelectorAll(".btn-danger")
        listConfirmBill.forEach((item) =>{
            item.addEventListener("click", () => {
                confirmBill(item.value)
                item.classList.remove("btn-danger")
                item.classList.add("btn-green")
                item.innerText = "✅Đã xác nhận"
                item.setAttribute("disabled","")
                Toast("Xác nhận thành công", "success")
            })
        })

    }
    catch (err) {
        console.log(err);
    }
}

getAllBill()