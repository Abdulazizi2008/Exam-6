import { checkToken, redirect } from "./utils.js";

(async function () {
  const hasToken = checkToken();
  if (hasToken == false) {
    redirect("../pages/log_in.html");
  }
})();

const productsArray = [];

async function fetchProducts() {
  try {
    const response = await fetch("https://api.escuelajs.co/api/v1/products");
    const data = await response.json();
    data.forEach((product) => {
      productsArray.push({
        name: product.title,
        description: product.description,
        price: product.price,
      });
    });
    displayProducts();
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

document
  .getElementById("addProductButton")
  .addEventListener("click", function () {
    const product = {
      name: document.getElementById("productName").value,
      description: document.getElementById("productDescription").value,
      price: document.getElementById("productPrice").value,
    };

    productsArray.push(product);

    displayProducts();

    document.getElementById("productForm").reset();
  });

function displayProducts() {
  document.getElementById("productList").innerHTML = productsArray
    .map(
      (product) =>
        `<p> <strong> Product Name:</strong> ${product.name}, <br/> <strong> Description:</strong> ${product.description},<br/> <strong> Price:</strong>Price: $${product.price}</p>`
    )
    .join("");
}

fetchProducts();
