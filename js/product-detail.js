import productsAPI from "../api/productApi.js";
import CartAPI from "../api/cartApi.js";
 const products_container = document.querySelector(".detail-product");

const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });

let value = params.id;
const getProduct = async () => {
    try {
        const result = await productsAPI.getAllProduct();
        console.log(result);
        
        console.log(value);

        result.forEach(product => {
            if (product.idProduct == value)
            {
                products_container.innerHTML = `<div class="w-size13 p-t-30 respon5">
				<div class="wrap-slick3 flex-sb flex-w">
					<div class="slick3">
						<div class="item-slick3" data-thumb="images/thumb-item-01.jpg">
							<div class="wrap-pic-w">
								<img src="images/product-detail-01.jpg" alt="IMG-PRODUCT">
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="w-size14 p-t-30 respon5">
				<h4 class="product-detail-name m-text16 p-b-13">
					${product.title}
				</h4>

				<span class="m-text17">
					$${product.price}
				</span>
				<!--  -->
				<div class="p-t-33 p-b-60">
					
					<div class="flex-m flex-w">
						<div class="s-text15 w-size15 t-center">
							Color : Black
						</div>
					</div>

					<div class="">
						<div class="w-size16 flex-m flex-w">
							
								<div class="flex-w bo5 of-hidden m-r-22 m-t-10 m-b-10">
								<input type="number" class="quantity size8 m-text18" min="1" max="${product.quantity}" value="1"/>
							</div>
							<div class="btn-addcart-product-detail size9 trans-0-4 m-t-10 m-b-10">
								<!-- Button -->
								<button class="flex-c-m sizefull bg1 bo-rad-23 hov1 s-text1 trans-0-4 cartBtn">
									Add to Cart
								</button>
							</div>	

							
							
						</div>
					</div>
				</div>
				<!--  -->
				<div class="wrap-dropdown-content bo6 p-t-15 p-b-14 active-dropdown-content">
					<h5 class="js-toggle-dropdown-content flex-sb-m cs-pointer m-text19 color0-hov trans-0-4">
						Description
						<i class="down-mark fs-12 color1 fa fa-minus dis-none" aria-hidden="true"></i>
						<i class="up-mark fs-12 color1 fa fa-plus" aria-hidden="true"></i>
					</h5>

					<div class="dropdown-content p-t-15 p-b-23">
						<p class="s-text8">
							${product.descr}
						</p>
					</div>
				</div>
			</div>`
            }
        })

		const cartBtn = document.querySelector(".cartBtn");
		console.log(cartBtn);
		
		let quantity = document.querySelector(".quantity");
		let sl = 1
		quantity.onchange = () => {
			sl = quantity.value 
		}
		console.log(quantity.value);
		cartBtn.onclick = () => {
			addCart (idUser,value,sl);
		}

    } catch (error) {
        console.log(error);
    }
};

getProduct();

let idUser = localStorage.getItem("userInfo");


let infoUser = JSON.parse(idUser)

const addCart = async (idUser, idProduct, quantity) => {
    try {
        const cart = {
            idUser: infoUser.idUser,
            idProduct: idProduct,
			quantity: quantity
        };
        const result = await CartAPI.addCart(cart);
        if (result && result.length > 0) {
            console.log("add cart success");
        }
    } catch (e) {
        console.log(e);
    }
};

// const cartBtn = document.querySelector(".cartBtn");
// console.log(cartBtn)


