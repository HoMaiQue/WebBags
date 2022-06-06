import productsAPI from "../api/productApi.js";
import handleRenderProduct from "../common/handleRenderProduct.js";
const products_container = document.querySelector(".products-container");

const getAllProducts = async () => {
    try {
        const result = await productsAPI.getAllProduct();
        handleRenderProduct(result, products_container);
    } catch (error) {
        console.log(error);
    }
};

getAllProducts();
