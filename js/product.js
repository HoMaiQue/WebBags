import productsAPI from "../api/productApi.js";
import brandApi from "../api/brandApi.js";
import handleRenderProduct from "../common/handleRenderProduct.js";
const products_container = document.querySelector(".products-container");
const brandList = document.querySelector(".brand-list");
const productInput = document.querySelector(".search-product-input");
const searchBtn = document.querySelector(".search-product-btn");
const filterPrice = document.querySelector(".filter-price")
console.log(filterPrice)

const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });

let valueBrand = params.idBrand;
console.log(valueBrand)

const getAllProducts = async () => {
    try {
        const result = await productsAPI.getAllProduct();
        // price
            filterPrice.addEventListener("change", () => {
                console.log(filterPrice.value)
                if (filterPrice.value == "$0.00 - $50.00"){
                    const filterResultP = result.filter((item) => {
                        return item.price <= 50
                    })
                    handleRenderProduct(filterResultP, products_container);
                }
                else if (filterPrice.value == "$50.00 - $100.00")
                {
                    const filterResultP = result.filter((item) => {
                        return item.price > 50 && item.price <= 100
                    })
                    handleRenderProduct(filterResultP, products_container);
                }
                else if (filterPrice.value == "$100.00 - $150.00")
                {
                    const filterResultP = result.filter((item) => {
                        return item.price > 100 && item.price <= 150
                    })
                    handleRenderProduct(filterResultP, products_container);
                }
                else if (filterPrice.value == "$150.00 - $200.00")
                {
                    const filterResultP = result.filter((item) => {
                        return item.price > 150 && item.price <= 200
                    })
                    handleRenderProduct(filterResultP, products_container);
                }
                else if (filterPrice.value == "$200.00")
                {
                    const filterResultP = result.filter((item) => {
                        return item.price > 200
                    })
                    handleRenderProduct(filterResultP, products_container);
                }
                else{
                    handleRenderProduct(result, products_container);
                }
            })


        // brand filter
        
         if (valueBrand != null) {
            const filterResult = result.filter((item) => {
                return item.idBrand == valueBrand
            })
            console.log(filterResult)
            handleRenderProduct(filterResult, products_container);
        }
        else{
            handleRenderProduct(result, products_container);
        }
        // name filter
        searchBtn.addEventListener("click", () =>{
            const filterResult = result.filter((item) => {
                return item.title.includes(productInput.value)
            })
            console.log(filterResult)
            handleRenderProduct(filterResult, products_container);
        })

        
    } catch (error) {
        console.log(error);
    }
};

getAllProducts();

const getAllBrand = async () => {
    try {
        const result = await brandApi.getAllBrand();
        const htmlCode = result.map((brand) => {
            return `<li class="p-t-4">
            <a href="product.html?idBrand=${brand.idBrand}" class="s-text13 active1">
                ${brand.nameBrand}
            </a>
        </li>`
        });
        brandList.innerHTML = htmlCode.join("");
    } catch (error) {
        console.log(error);
    }
};

getAllBrand();


