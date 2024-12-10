
export let cart;

loadFromStorage();

export function loadFromStorage() {
    cart = JSON.parse(localStorage.getItem('cart'));

    if (!cart) {
        cart = [{
            productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
            quantity: 2,
            deliveryOptionId: '1'
        }, {
            productId: '83d4ca15-0f35-48f5-b7a3-1ea210004f2e',
            quantity: 3,
            deliveryOptionId: '2'
        }];
    }
}

export function addToCart(productId) {
    let matchingItem;
    cart.forEach((item) => {
        if (productId === item.productId) {
            matchingItem = item;
        }
    });

    const quantity = Number((document.querySelector(`.js-quantity-selector-${productId}`)).value);

    if (matchingItem) {
        matchingItem.quantity += quantity;
    }
    else {
        cart.push({
            productId,
            quantity,
            deliveryOptionId: '1'
        })
    }
    saveToStorage();
}


export function removeFromCart(productId) {
    const newCart = [];
    cart.forEach((item) => {
        if (item.productId !== productId) {
            newCart.push(item);
        }
    });
    cart = newCart
    saveToStorage();
}

function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function calculateCartQuantity() {
    let cartQuantity = 0;
    cart.forEach((item) => {
        cartQuantity += item.quantity
    })

    return cartQuantity;
}

export function updateQuantity(productId, newQuantity) {
    cart.forEach((cartItem) => {
        if (cartItem.productId === productId) {
            cartItem.quantity = newQuantity;
        }
    });
    saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;
    cart.forEach((item) => {
        if (productId === item.productId) {
            matchingItem = item;
        }
    });

    if (!matchingItem) {
        return;
    }
    matchingItem.deliveryOptionId = deliveryOptionId;
    saveToStorage();
}

export function resetCart() {
    cart = [];
    saveToStorage(cart);
}