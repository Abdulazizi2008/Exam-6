import { checkToken, redirect } from "./utils.js";

(async function () {
  const hasToken = checkToken();
  if (hasToken == false) {
    redirect("../pages/log_in.html");
  }
})();

function getProductsFromLocalStorage() {
  const products = localStorage.getItem("products");
  return products ? JSON.parse(products) : [];
}

function saveProductsToLocalStorage(productsArray) {
  localStorage.setItem("products", JSON.stringify(productsArray));
}

function displayProducts(productsArray) {
  document.getElementById("productList").innerHTML = productsArray
    .map(
      (product) =>
        `<p> <strong>Product Name:</strong> ${product.name}, <br/> <strong>Description:</strong>  ${product.description}, <br/> <strong>Price:</strong>  $${product.price}</p>`
    )
    .join("");
}

const productsArray = getProductsFromLocalStorage();
displayProducts(productsArray);

document
  .getElementById("addProductButton")
  .addEventListener("click", function () {
    const product = {
      name: document.getElementById("productName").value,
      description: document.getElementById("productDescription").value,
      price: document.getElementById("productPrice").value,
    };

    productsArray.push(product);

    saveProductsToLocalStorage(productsArray);

    displayProducts(productsArray);

    document.getElementById("productForm").reset();
  });
