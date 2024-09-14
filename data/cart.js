export const cart = [];

export function addToCart(productId) {
    let matchingItem;
    cart.forEach((item) => {
        if (productId === item.productId) {
            matchingItem = item;
        }
    })

    const quantity = Number((document.querySelector(`.js-quantity-selector-${productId}`)).value);

    if (matchingItem) {
        matchingItem.quantity += quantity;
    }
    else {
        cart.push({
            productId,
            quantity
        })
    }
}