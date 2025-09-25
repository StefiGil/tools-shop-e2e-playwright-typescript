import { test, expect } from '../../core/fixtures';
import registerData from '../../data/registerData.json';
import { RegisterPage } from '../../page-objects/RegisterPage';
import { url } from 'inspector';

function generateRandomEmail(baseEmail: string) {
  const unique = Date.now();
  return baseEmail.replace('${random}', unique.toString());
}

for (const user of registerData) {
  test(`registro de nuevo usuario: ${user.firstName} ${user.lastName}`, async ({ page }) => {
    const registerPage = new RegisterPage(page);
    await registerPage.goto();

    const uniqueEmail = generateRandomEmail(user.email);
    await registerPage.register({ ...user, email: uniqueEmail });

    await expect(page).toHaveURL('/auth/login');
  });
}
