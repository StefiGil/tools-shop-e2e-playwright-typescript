import { test, expect } from '../../page-objects/fixtures';
import loginData from '../../data/loginDataInvalidos.json';

for (const user of loginData) {
  test(`login inválido: ${user.description}`, async ({ loginPage, page }) => {

    await page.goto('https://practicesoftwaretesting.com/auth/login');

    await loginPage.login(user.email, user.password);

    // Siempre permanece en la página de login
    await expect(page).toHaveURL('https://practicesoftwaretesting.com/auth/login');

    for (const error of user.errors) {
    let errorLocator;
    if ('errorId' in error) {
        errorLocator = page.locator(`#${error.errorId}`);
    } else if ('dataTest' in error) {
        errorLocator = page.locator(`[data-test="${error.dataTest}"]`);
    } else {
        throw new Error('Error JSON debe tener errorId o dataTest');
    }

    await expect(errorLocator).toHaveText(error.expectedError);
    }

  });
}
