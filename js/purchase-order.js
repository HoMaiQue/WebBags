import billApi from "../api/billApi.js";
import productsAPI from "../api/productApi.js";

const wrap_item = document.querySelector(".wrap-item");
const getProductOrdered = async () => {
    try {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        let productList = [];
        if (userInfo) {
            const billResult = await billApi.getBillByIdUser(userInfo.idUser);

            if (billResult && billResult.length > 0) {
                for (const bill of billResult) {
                    const billDetailResult =
                        await billApi.getBillDetailByIdBill(bill.idBill);

                    if (billDetailResult && billDetailResult.length > 0) {
                        for (const billDetail of billDetailResult) {
                            const productItemList =
                                await productsAPI.getProductById(
                                    billDetail.idProduct
                                );
                            if (productItemList && productItemList.length > 0) {
                                productItemList[0].status = bill.status;
                                productItemList[0].dateBill = bill.dateBill;
                                productItemList[0].quantityBought =
                                    billDetail.quantity;
                            }
                            productList = [...productList, ...productItemList];
                        }
                    }
                }
            }
            console.log(productList);
            return productList;
        }
    } catch (error) {
        console.log(error);
    }
};
const convertDate = (data) => {
    const newDate = data.slice(0, 10).split("-").reverse();
    newDate[0] = +newDate[0] + 1;
    return newDate.join("-");
};
const renderPurchaseOrder = () => {
    getProductOrdered().then((data) => {
        const listProduct = data.map((product) => {
            return `
                 <tr class="table-row cart-item " >
            <td class="column-1">
                <div
                    class="cart-img-product b-rad-4 o-f-hidden remove-product" "
                >
                    <img
                    src="data:image/jpg;base64, ${
                        product.image
                    }" width="90" height="120"
                        alt="IMG-PRODUCT"
                    />
                </div>
            </td>
            <td class="column-3">${product.title}</td>
            <td class="column-3">$ ${product.price}</td>
            <td class="column-3 pl-3">
                x ${product.quantityBought}
            </td>
            <td class="column-3 product-price" >$ ${
                product.price * product.quantityBought
            }</td>
            </td>
            <td class="column-5 product-price " >${convertDate(
                product.dateBill
            )}
            </td>
            <td class="column-5 product-price " style="${
                product.status === 0 ? "color: red" : "color: green"
            }; font-weight: bold" >${
                product.status === 0 ? "Ch??? x??c nh???n" : "X??c nh???n"
            }
            </td>
            
            </tr>   
            `;
        });
        wrap_item.innerHTML = listProduct.join("");
    });
};
renderPurchaseOrder();
console.log();
