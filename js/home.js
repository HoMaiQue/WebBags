import productsAPI from "../api/productApi.js";
import handleRenderPrInHome from "../common/handelRenderPrInHome.js";
const products_container = document.querySelector(".products-container");


const getAllProductsInHome = async () => {
    try {
        const result = await productsAPI.getAllProduct();
        console.log(result);
        handleRenderPrInHome(result, products_container);
        const newProductName = document.querySelector(".new_product_name");
        newProductName.innerText = result[result.length - 1].title;
        const newProductTitle = document.querySelector(".new_product_price");
        newProductTitle.innerText = result[result.length - 1].price;
    } catch (error) {
        console.log(error);
    }
};

getAllProductsInHome();
