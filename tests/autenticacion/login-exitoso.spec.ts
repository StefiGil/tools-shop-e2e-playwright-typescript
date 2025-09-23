import { test, expect } from '../../page-objects/fixtures';
import loginData from '../../data/loginDataExitoso.json';

for (const user of loginData) {
  test(`login con ${user.email}`, async ({ loginPage, page }) => {

    await page.goto('https://practicesoftwaretesting.com/auth/login');

    await loginPage.login(user.email, user.password);

        if (user.role === 'admin') {
          await expect(loginPage.page).toHaveURL('https://practicesoftwaretesting.com/admin/dashboard');
        } else if (user.role === 'customer') {
          await expect(loginPage.page).toHaveURL('https://practicesoftwaretesting.com/account');
        } else {
          throw new Error(`Rol desconocido: ${user.role}`);
        }

  });
}
