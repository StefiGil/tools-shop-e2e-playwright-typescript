import { test, expect } from '../../core/fixtures';
import registerData from '../../data/registerData.json';

function generateRandomEmail(baseEmail: string) {
  const unique = Date.now();
  return baseEmail.replace('${random}', unique.toString());
}

for (const user of registerData) {
  test(`registro de nuevo usuario: ${user.firstName} ${user.lastName}`, async ({ page, registerPage }) => {
    await registerPage.goto();

    const uniqueEmail = generateRandomEmail(user.email);
    await registerPage.register({ ...user, email: uniqueEmail });

    await expect(page).toHaveURL('/auth/login');
  });
}
