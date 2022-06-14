import brandApi from "../api/brandApi.js";
import colorApi from "../api/colorApi.js";
import productsAPI from "../api/productApi.js";

const renderSelect = (list, containerElement, type) => {
    const newList = list.map((item) => {
        return `
    <option  value="${type ? item.idBrand : item.idColor}">
        ${type ? item.nameBrand : item.nameColor}
    </option>
        `;
    });
    const defaultOption = ` <option value="">
             Please select
        </option>`;
    newList.unshift(defaultOption);
    if (containerElement) {
        containerElement.innerHTML = newList.join("");
    }
};
const selectBrand = document.querySelector(".brand-list");
const selectColor = document.querySelector(".color-list");
const handleRenderBrand = async () => {
    try {
        const brandList = await brandApi.getAllBrand();
        if (brandList && brandList.length > 0) {
            renderSelect(brandList, selectBrand, "BRAND");
        }
    } catch (error) {
        console.log(error);
    }
};
const handleRenderColor = async () => {
    try {
        const colorList = await colorApi.getAllColor();
        console.log(colorList);
        if (colorList && colorList.length > 0) {
            renderSelect(colorList, selectColor);
        }
    } catch (error) {
        console.log(error);
    }
};

handleRenderBrand();
handleRenderColor();

const setValueInput = (inputElm, value) => {
    inputElm.value = value;
};
const setValueSelect = (select, value)=> {
    let i = 0;
    while(i < 10) {
        console.log(select.options[i].value)
        if(+select.options[i].value === value){
            select.options[i].selected = true 
            console.log(i)
            return
        }
        i++
    }
}
const titleInput = document.querySelector(".title-input");
const priceInput = document.querySelector(".price-input");
const quantityInput = document.querySelector(".quantity-input");
const descriptionInput = document.querySelector(".description-area");
const handleLoadProductUpdate = async () => {
    const params = new URLSearchParams(window.location.search);
    if (params.has("idProduct")) {
        const idProduct = +params.get("idProduct");
        const product = await productsAPI.getProductById(idProduct);
        if (product && product.length > 0) {
            setValueInput(titleInput, product[0].title);
            setValueInput(quantityInput, product[0].quantity);
            setValueInput(priceInput, product[0].price);
            setValueInput(descriptionInput, product[0].descr);
            setValueSelect(selectBrand, product[0].idBrand)
            setValueSelect(selectColor, product[0].idColor)
        }
    }
};
handleLoadProductUpdate();
