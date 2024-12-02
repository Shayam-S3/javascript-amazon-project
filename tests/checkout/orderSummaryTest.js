import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { loadFromStorage, cart } from "../../data/cart.js";
import { loadProducts } from "../../data/products.js";

describe("test suite: renderOrderSummary", () => {
    const productId1 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
    const productId2 = '83d4ca15-0f35-48f5-b7a3-1ea210004f2e';
    beforeAll((done) => {
        loadProducts(() => {
            done();
        });
    });
    beforeEach(() => {
        spyOn(localStorage, 'setItem');
        document.querySelector('.js-test-container').innerHTML = `
        <div class="js-order-summary"></div>
        <div class="js-payment-summary"></div>
        <div class="js-checkout-header"></div>
        `;
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: productId1,
                quantity: 2,
                deliveryOptionId: '1'
            }, {
                productId: productId2,
                quantity: 3,
                deliveryOptionId: '2'
            }]);
        });
        loadFromStorage();
        renderOrderSummary();
    })

    afterAll(() => {
        const container = document.querySelector('.js-test-container');
        if (container) {
            container.remove();
        }
    })

    it('displays the cart', () => {
        expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(2);
        expect(document.querySelector(`.js-product-quantity-${productId1}`).innerText).toContain('Quantity: 2');
        expect(document.querySelector(`.js-product-quantity-${productId2}`).innerText).toContain('Quantity: 3');
        expect(document.querySelector(`.js-product-name-${productId1}`).innerText).toEqual('Intermediate Size Basketball');
        expect(document.querySelector(`.js-product-name-${productId2}`).innerText).toEqual('Adults Plain Cotton T-Shirt - 2 Pack');
    });

    it("removes a product", () => {

        document.querySelector(`.js-delete-link-${productId1}`).click();
        expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(1);
        expect(document.querySelector(`.js-cart-item-container-${productId1}`)).toBeNull();
        expect(document.querySelector(`.js-cart-item-container-${productId2}`)).not.toBeNull();
        expect(document.querySelector(`.js-product-name-${productId2}`).innerText).toEqual('Adults Plain Cotton T-Shirt - 2 Pack');
        expect(cart.length).toEqual(1);
        expect(cart[0].productId).toEqual(productId2);
    });


    it("updates the delivery option", () => {
        document.querySelector(`.js-delivery-option-${productId1}-3`).click();

        expect(document.querySelector(`.js-delivery-option-input-${productId1}-3`).checked).toEqual(true);
        expect(cart.length).toEqual(2);
        expect(cart[0].productId).toEqual(productId1);
        expect(cart[0].deliveryOptionId).toEqual('3');
        expect(
            document.querySelector('.js-payment-summary-shipping').innerText
        ).toEqual('$14.98');
        expect(
            document.querySelector('.js-payment-summary-total').innerText
        ).toEqual('$88.94');

    });

});