import { addToCart, cart, loadFromStorage, removeFromCart, updateDeliveryOption } from "../../data/cart.js";

describe('test suite: addToCart', () => {
    beforeEach(() => {
        spyOn(localStorage, 'setItem');
        spyOn(localStorage, 'getItem').and.callFake(() => JSON.stringify([]));
        loadFromStorage();

        // Create a mock DOM element
        const mockInput = document.createElement('input');
        mockInput.className = 'js-quantity-selector-15b6fc6f-327a-4ec4-896f-486349e85a3d';
        mockInput.value = '2'; // Set the desired quantity
        document.body.appendChild(mockInput);
    });

    afterEach(() => {
        // Clean up mock DOM elements after each test
        const mockElement = document.querySelector('.js-quantity-selector-15b6fc6f-327a-4ec4-896f-486349e85a3d');
        if (mockElement) {
            mockElement.remove();
        }
    });

    it('adds an exsisting product to the cart', () => {

        // Add the product to the cart initially
        cart.push({ productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d', quantity: 1, deliveryOptionId: '1' });

        addToCart('15b6fc6f-327a-4ec4-896f-486349e85a3d');

        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
            productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
            quantity: 3,
            deliveryOptionId: '1'
        }]));
        expect(cart[0].productId).toEqual('15b6fc6f-327a-4ec4-896f-486349e85a3d');
        expect(cart[0].quantity).toEqual(3);


    });

    it('adds an new product to the cart', () => {
        addToCart('15b6fc6f-327a-4ec4-896f-486349e85a3d');

        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
            productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
            quantity: 2,
            deliveryOptionId: '1'
        }]));
        expect(cart[0].productId).toEqual('15b6fc6f-327a-4ec4-896f-486349e85a3d');
        expect(cart[0].quantity).toEqual(2);
    });
})

describe('test suite: removeFromCart', () => {
    beforeEach(() => {
        spyOn(localStorage, 'setItem');
    });

    it('removes a product from the cart', () => {
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 1,
                deliveryOptionId: '1'
            }]);
        });
        loadFromStorage();

        removeFromCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.length).toEqual(0);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([]));
    });

    it('does nothing if product is not in the cart', () => {
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 1,
                deliveryOptionId: '1'
            }]);
        });
        loadFromStorage();

        removeFromCart('does-not-exist');
        expect(cart.length).toEqual(1);
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 1,
            deliveryOptionId: '1'
        }]));
    });
});

describe("test suite: updateDeliveryOption", () => {
    beforeEach(() => {
        spyOn(localStorage, 'setItem');
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 1,
                deliveryOptionId: '1'
            }]);
        });
        loadFromStorage();

    });
    it("updates the delivery option", () => {
        updateDeliveryOption('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', '2');
        expect(cart.length).toEqual(1);
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(1);
        expect(cart[0].deliveryOptionId).toEqual('2');
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    });

    it("does nothing if the product is not in the cart", () => {
        updateDeliveryOption('e43638ce-b27f-e1d07eb678c6', '3');
        expect(cart.length).toEqual(1);
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(1);
        expect(cart[0].deliveryOptionId).toEqual('1');
        expect(localStorage.setItem).toHaveBeenCalledTimes(0);
    });
});