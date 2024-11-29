import { addToCart, cart, loadFromStorage } from "../../data/cart.js";

describe('test suite: addToCart', () => {
    beforeEach(() => {
        spyOn(localStorage, 'setItem');
        spyOn(localStorage, 'getItem').and.callFake(() => JSON.stringify([]));
        loadFromStorage();
    });

    afterEach(() => {
        // Clean up mock DOM elements after each test
        const mockElement = document.querySelector('.js-quantity-selector-15b6fc6f-327a-4ec4-896f-486349e85a3d');
        if (mockElement) {
            mockElement.remove();
        }
    });

    it('adds an exsisting product to the cart', () => {

        // Create a mock DOM element
        const mockInput = document.createElement('input');
        mockInput.className = 'js-quantity-selector-15b6fc6f-327a-4ec4-896f-486349e85a3d';
        mockInput.value = '2'; // Set the desired quantity
        document.body.appendChild(mockInput);

        // Add the product to the cart initially
        cart.push({ productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d', quantity: 1, deliveryOptionId: '1' });

        addToCart('15b6fc6f-327a-4ec4-896f-486349e85a3d');

        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('15b6fc6f-327a-4ec4-896f-486349e85a3d');
        expect(cart[0].quantity).toEqual(3);

    });

    it('adds an new product to the cart', () => {
        // Create a mock DOM element
        const mockInput = document.createElement('input');
        mockInput.className = 'js-quantity-selector-15b6fc6f-327a-4ec4-896f-486349e85a3d';
        mockInput.value = '2'; // Set the desired quantity
        document.body.appendChild(mockInput);

        addToCart('15b6fc6f-327a-4ec4-896f-486349e85a3d');

        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('15b6fc6f-327a-4ec4-896f-486349e85a3d');
        expect(cart[0].quantity).toEqual(2);
    });
})