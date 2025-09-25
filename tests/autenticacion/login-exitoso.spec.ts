import { test, expect } from '../../page-objects/fixtures';
import loginData from '../../data/loginDataExitoso.json';

for (const user of loginData) {
  test(`login con ${user.email}`, async ({ loginPage, page }) => {

    await page.goto('/auth/login');

    await loginPage.login(user.email, user.password);

        if (user.role === 'admin') {
          await expect(loginPage.page).toHaveURL('/admin/dashboard');
        } else if (user.role === 'customer') {
          await expect(loginPage.page).toHaveURL('/account');
        } else {
          throw new Error(`Rol desconocido: ${user.role}`);
        }

  });
}
