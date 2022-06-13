const handleRenderPrInHome = (datas, parentElement) => {
    const result = datas.map((product) => {

        return `<a href="/product-detail.html?id=${product.idProduct}">
        <div class="featured-item">
        <img class="img-product-slide" src="data:image/jpg;base64, ${product.image}" alt=""></img>
          <h4>${product.title}</h4>
          <h6>$${product.price}</h6>

        return `<div class="owl-item">
        <div class="bbb_viewed_item d-flex flex-column align-items-center justify-content-center text-center">
            <div class="bbb_viewed_image"><img src="data:image/jpg;base64, ${product.image}" width="150" height="200"></div>
            <div class="bbb_viewed_content text-center">
                <div class="bbb_viewed_price">$${product.price}</div>
                <div class="bbb_viewed_name"><a href="/product-detail.html?id=${product.idProduct}">${product.title}</a></div>
            </div>
            

        </div>
      </a>`;
    });
    parentElement.innerHTML = result.join("");

    
    
};
export default handleRenderPrInHome