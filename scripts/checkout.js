import { cart, removeFromCart, calculateCartQuantity, updateQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

let cartSummaryHTML = '';

cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    let matchingProdut;

    products.forEach((product) => {
        if (product.id === productId) {
            matchingProdut = product
        }
    })

    cartSummaryHTML += `<div class="cart-item-container 
    js-cart-item-container-${matchingProdut.id}">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProdut.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProdut.name};
                </div>
                <div class="product-price">
                  $${formatCurrency(matchingProdut.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label js-quantity-label-${matchingProdut.id}">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingProdut.id}">
                    Update
                  </span>
                  <input class="quantity-input js-quantity-input-${matchingProdut.id}">
                  <span class="save-quantity-link link-primary js-save-link" data-product-id="${matchingProdut.id}">Save</span>
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProdut.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${matchingProdut.id}">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingProdut.id}">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-1">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>`;
})

document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

updateCartQuantity();

document.querySelectorAll('.js-delete-link').forEach(((link) => {
    link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        removeFromCart(productId);
        document.querySelector(`.js-cart-item-container-${productId}`).remove();
        updateCartQuantity();

    })
}))

function updateCartQuantity() {
    const cartQuantity = calculateCartQuantity();
    document.querySelector('.js-view-quantity')
        .innerHTML = `${cartQuantity} items`;
}

document.querySelectorAll('.js-update-link').forEach((updateLink) => {
    updateLink.addEventListener('click', () => {
        const productId = updateLink.dataset.productId;
        document.querySelector(`.js-cart-item-container-${productId}`).classList.add('is-editing-quantity');
    });
});

document.querySelectorAll('.js-save-link').forEach((saveLink) => {
    saveLink.addEventListener('click', () => {
        const productId = saveLink.dataset.productId;
        const newQuantity = Number(document.querySelector(`.js-quantity-input-${productId}`).value);

        if (newQuantity < 0 || newQuantity >= 1000) {
            alert('Quantity must be at least 0 and less than 1000');
            return;
        }

        updateQuantity(productId, newQuantity);
        document.querySelector(`.js-cart-item-container-${productId}`).classList.remove('is-editing-quantity');
        document.querySelector(`.js-quantity-label-${productId}`).innerHTML = newQuantity;
        updateCartQuantity();
    });
});