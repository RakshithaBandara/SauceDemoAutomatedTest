import { Selector } from 'testcafe';

fixture`Sauce Demo Automated Test`
    .page`https://www.saucedemo.com`;

test('Complete Purchase', async (t) => {
    // Login
    await t
        .typeText('#user-name', 'performance_glitch_user')
        .typeText('#password', 'secret_sauce')
        .click('#login-button');

    // Check product price
    const jacketPrice = await Selector('.inventory_item_price').withText('$49.99');
    await t.expect(jacketPrice.exists).ok();

    // Add products to cart
    await t
        .click('[data-test="add-to-cart-sauce-labs-backpack"]')
        .click('[data-test="add-to-cart-sauce-labs-bike-light"]');

    // Go to cart and verify products
    await t
        .click('.shopping_cart_link')
        .expect(Selector('.cart_item').count).eql(2);

    // Checkout
    await t.click('[data-test="checkout"]');

    // Fill out checkout information
    const firstName = 'Test';
    const lastName = 'User';
    const zipCode = '12345';
    await t
        .typeText('[data-test="firstName"]', firstName)
        .typeText('[data-test="lastName"]', lastName)
        .typeText('[data-test="postalCode"]', zipCode)
        .click('[data-test="continue"]');

    // Finish purchase
    await t.click('[data-test="finish"]');
});