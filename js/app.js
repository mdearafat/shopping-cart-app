"use strict";
// Importing the products array from the products.js file
import allProducts from "./products.js";
//getting product-list container
const productList = document.getElementById("product-list");
//putting products into the productList container
for (const product of allProducts) {
  productList.innerHTML += `
<div class="product-box xl:col-span-3 md:col-span-4 col-span-12 shadow-lg rounded-md ">
    <div class="product-img-box">
        <img src=${product.img}.jpg class="product-image rounded-t-md w-[100%] alt="${product.name}">
    </div>
    <div class=" product-info p-4 flex flex-col gap-4">
        <h2 class="product-name text-primary min-h-[56px]">${product.name}</h2>
        <p class="product-price text-secondary">$${product.price}</p>
        <div class="product-quantity text-secondary">
            <label for="quantity">Qty:</label>
            <select name="quantity" class="initial-qty border-2">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <!-- Add more options as needed -->
            </select>
        </div>
        <button class="add-to-cart btn btn-primary text-center mt-4  ">add
            to cart</button>
    </div>
</div>`;
}

//adding to the cart
const addedProducts = document.getElementById("added-products");
const btnAddToCart = document.querySelectorAll(".add-to-cart");
const initialQtys = document.querySelectorAll(".initial-qty");
//total amount
const totalAmount = document.getElementById("total-amount");
let total = 0;

function addToCart(product, index) {
  const initialQty = initialQtys[index].value;
  const cartItem = document.createElement("div");
  cartItem.classList.add(
    "flex",
    "justify-start",
    "gap-2",
    "bg-white",
    "shadow-sm"
  );
  cartItem.innerHTML = `
    <img src=${product.img}-s.jpg>
    <div class="p-2 text-tertiary flex flex-col gap-2">
        <div class="flex justify-between items-center">
            <p class="">$${product.price}</p>
            <img src="images/remove.svg" class="h-4 w-4 cursor-pointer fill-red-300 remove-product" alt="">
        </div>
        <div class="quantity-option">
            <p class="flex gap-2 items-center">Qty:
                <span class="flex gap-1 items-center">
                    <button class="decrease-qty border-2 leading-none h-6 w-6">-</button>
                    <small class="final-qty border-2 leading-none h-6 w-6 text-center p-1">${initialQty}</small>
                    <button class="increase-qty border-2 leading-none h-6 w-6">+</button>
                </span>
            </p>
        </div>
        <p class="individual-total text-sm font-medium">Subtotal: <span class="text-green-400">$${(
          product.price * initialQty
        ).toFixed(2)}</span></p>
    </div>
  `;

  total += initialQty * product.price;
  totalAmount.textContent = "$" + total.toFixed(2);
  addedProducts.appendChild(cartItem);

  const decreaseQtyBtn = cartItem.querySelector(".decrease-qty");
  const increaseQtyBtn = cartItem.querySelector(".increase-qty");
  const finalQty = cartItem.querySelector(".final-qty");
  const individualTotal = cartItem.querySelector(".individual-total span");
  const removeProductBtn = cartItem.querySelector(".remove-product");

  decreaseQtyBtn.addEventListener("click", () => {
    let qty = parseInt(finalQty.textContent);
    if (qty > 1) {
      qty--;
      finalQty.textContent = qty;
      individualTotal.textContent = `$${(product.price * qty).toFixed(2)}`;
      total -= product.price;
      totalAmount.textContent = "$" + total.toFixed(2);
    }
  });

  increaseQtyBtn.addEventListener("click", () => {
    let qty = parseInt(finalQty.textContent);
    qty++;
    finalQty.textContent = qty;
    individualTotal.textContent = `$${(product.price * qty).toFixed(2)}`;
    total += product.price;
    totalAmount.textContent = "$" + total.toFixed(2);
  });
  removeProductBtn.addEventListener("click", () => {
    addedProducts.removeChild(cartItem);
    let qty = parseInt(finalQty.textContent);
    total -= product.price * qty;
    totalAmount.textContent = "$" + total.toFixed(2);
  });
}

btnAddToCart.forEach((button, index) => {
  button.addEventListener("click", () => {
    const product = allProducts[index];
    addToCart(product, index);
  });
});

//clear cart button
const clearCartBtn = document.getElementById("clear-cart");
clearCartBtn.addEventListener("click", () => {
  addedProducts.innerHTML = "";
  total = 0;
  totalAmount.textContent = "$0.00";
});

//applying discount
const cuponBtn = document.getElementById("cupon-btn");
const cupon = document.getElementById("cupon");
const cuponMsg = document.getElementById("cupon-msg");
let countSuccess = false;
cuponBtn.addEventListener("click", () => {
  const cuponValue = cupon.value;
  if (!countSuccess) {
    if (cuponValue === "OSTADM4") {
      total -= total * (10 / 100);
      totalAmount.textContent = "$" + total.toFixed(2);
      cuponMsg.className = "text-green-400";
      cuponMsg.textContent = "Cupon Aplied✅";
      countSuccess = true;
    } else {
      cuponMsg.className = "text-red-400";
      cuponMsg.textContent = "Wrong Cupon❌";
    }
  } else {
    cuponMsg.className = "text-green-400";
    cuponMsg.textContent = "Cupon Already Applied.";
  }
});
