const handleRenderPrInHome = (datas, parentElement) => {
  const result = datas.map((product) => {
      return `<a href="/product-detail.html?id=${product.idProduct}">
      <div class="featured-item">
      <img class="img-product-slide" src="data:image/jpg;base64, ${product.image}" alt=""></img>
        <h4>${product.title}</h4>
        <h6>$${product.price}</h6>
      </div>
    </a>`;
  });
  parentElement.innerHTML = result.join("");

  
  
};
export default handleRenderPrInHome