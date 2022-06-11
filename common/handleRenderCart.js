import cartsAPI from "../api/cartApi.js";
import productsAPI from "../api/productApi.js";

const cart_list = document.querySelector(".header-cart-wrapitem");
const cart_logo = document.querySelector(".cart-logo img");
export const getProductInCart = async () => {
    const productsInCart = [];
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (!userInfo) return;
    const cartList = await cartsAPI.getCartById(userInfo.idUser);
    if (cartList && cartList.length > 0) {
        for (const cart of cartList) {
            const productDetails = await productsAPI.getProductById(
                cart.idProduct
            );
            if (productDetails && productDetails.length > 0) {
                productDetails[0].quantityChoice = cart.quantity
                productsInCart.push(productDetails[0]);
            }
        }
        return productsInCart;
    }

    return [];
};

const renderViewProduct = async (callback) => {
    const productList = await callback();
    if (productList.length <= 0) return;
    console.log("first", productList)
    const newProductList = productList.map((product) => {
        return ` <li class="header-cart-item cart-item" data-product="${product.idProduct}">
            <div class="header-cart-item-img remove-product" >
                <img src="data:image/jpg;base64, ${product.image}" width="80" height="80" alt="IMG">
            </div>
        
            <div class="header-cart-item-txt">
                <a href="#" class="header-cart-item-name">
                  ${product.title}
                </a>
        
                <span class="header-cart-item-info">
                price: ${product.price}
                </span>
            </div>
         </li>`;
    });
    cart_list.innerHTML = newProductList.join("");
    let cartItem_list = document.querySelectorAll(".cart-item");
    cartItem_list.forEach((item) => {
        item.addEventListener("click", async (e) => {
            item.innerHTML = "";
            const idProduct = item.dataset.product
            await cartsAPI.deleteProductById(idProduct)
        });
    });
   
};
renderViewProduct(getProductInCart);
console.log(cart_logo)
cart_logo.addEventListener("click", () => {
    renderViewProduct(getProductInCart);
});
