import cartsAPI from "../api/cartApi.js";
import { getProductInCart } from "../common/handleRenderCart.js";

const wrap_item = document.querySelector(".table-shopping-cart .wrap-item");
console.log(wrap_item);
const handleRenderProductInCart = async (callback) => {
    const productList = await getProductInCart();
    if (productList.length <= 0) return;
    const newProductList = productList.map((product) => {
        return `  <tr class="table-row">
        <td class="column-1">
            <div
                class="cart-img-product b-rad-4 o-f-hidden"
            >
                <img
                src="data:image/jpg;base64, ${product.image}" width="90" height="120"
                    alt="IMG-PRODUCT"
                />
            </div>
        </td>
        <td class="column-2">${product.title}</td>
        <td class="column-3">$ ${product.price}</td>
        <td class="column-4">
            <div class="flex-w bo5 of-hidden w-size17">
                <button
                    class="btn-num-product-down btn-down color1 flex-c-m size7 bg8 eff2"
                >
                    <i
                        class="fs-12 fa fa-minus"
                        aria-hidden="true"
                    ></i>
                </button>
                <input
                    class="size8 m-text18 t-center num-product"
                    type="number"
                    name="num-product1"
                    data-quantity="${product.quantity}"
                    value="${product.quantityChoice}"
                    disabled
                />
                <button
                    class="btn-num-product-up btn-up color1 flex-c-m size7 bg8 eff2"
                >
                    <i
                        class="fs-12 fa fa-plus"
                        aria-hidden="true"
                    ></i>
                </button>
            </div>
        </td>
        <td class="column-5 product-price" data-price="${
            product.price
        }"  data-id="${product.idProduct}">$ <span>${
            +product.quantityChoice * product.price
        }</span>
        </td>
    </tr>`;
    });
    wrap_item.innerHTML = newProductList.join("");
    const btnDownList = document.querySelectorAll(".btn-down");
    const btnUpList = document.querySelectorAll(".btn-up");
    const num_productList = document.querySelectorAll(".num-product");
    const productPrices = document.querySelectorAll(".product-price");
    const totalPriceEl = document.querySelector(".total-price");
    const userInfo = JSON.parse(localStorage.getItem("userInfo"))
    let totalPriceBefore = 0;
    productPrices.forEach((product) => {
        const priceUpdate = +product.innerText.slice(2);
        totalPriceBefore += priceUpdate;
    });
    totalPriceEl.textContent = `$ ${totalPriceBefore}`;
    btnDownList.forEach((btnDown, index) => {
        btnDown.addEventListener("click", () => {
            let quantityChoice = +num_productList[index].value;
            const priceOfProduct = productPrices[index].dataset.price;
            if (quantityChoice === 0) return;
            +num_productList[index].value--;
            productPrices[index].innerHTML = `$ ${
                +priceOfProduct * +num_productList[index].value
            }`;
        });
    });

    btnUpList.forEach((btnUp, index) => {
        btnUp.addEventListener("click", () => {
            const quantityAvailable = +num_productList[index].dataset.quantity;
            const priceOfProduct = productPrices[index].dataset.price;
            if (+num_productList[index].value === quantityAvailable) return;
            +num_productList[index].value++;
            productPrices[index].innerHTML = `$ ${
                +priceOfProduct * +num_productList[index].value
            }`;
        });
    });

    const btn_updateCart = document.querySelector(".btn-Update-Cart");
    btn_updateCart.addEventListener("click", () => {
        let totalPrice = 0;
        productPrices.forEach(async (product, index) => {
            const priceUpdate = +product.innerText.slice(2);
            const idProduct = product.dataset.id;
            if (priceUpdate === 0) {
                await cartsAPI.deleteProductById(idProduct);
                product.parentNode.remove();
            }

            totalPrice += priceUpdate;
            const quantity = +num_productList[index].value
            const cartItem = {
                idUser: userInfo.idUser,
                idProduct: idProduct,
                quantity: quantity
                
            }
            await cartsAPI.updateCart(cartItem)
        });
        totalPriceEl.textContent = `$ ${totalPrice}`;
    });
};
const handleRenderInfoUser = () => {
    const address = document.querySelector(".address");
    const fullName = document.querySelector(".fullName");
    const phoneNumber = document.querySelector(".phoneNumber");
    const infoUser = JSON.parse(localStorage.getItem("userInfo"));
    if (infoUser) {
        address.textContent = infoUser.addressCustomer;
        fullName.textContent = infoUser.name;
        phoneNumber.textContent = infoUser.phone;
    }
};
const orderProduct = document.querySelector(".order-product");
console.log(orderProduct);
const handleOrderProduct = () => {
    orderProduct.addEventListener("click", () => {
        Toastify({
            text: "Bạn đã đặt hàng thành công",
            className: "success",
            duration: 1000,
            style: {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#2dd284",
                height: "75px",
                width: "300px",
                borderRadius: "5px"
            },
            offset: {
                x: "38em" ,
                y: 10,
            },
        }).showToast();
    });
};
handleOrderProduct();
handleRenderInfoUser();
handleRenderProductInCart();
