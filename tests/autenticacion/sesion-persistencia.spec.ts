import { test, expect } from '../../page-objects/fixtures';
import { LoginPage } from '../../page-objects/LoginPage';

const user = {
  email: "carla.fernandez45678@mail.com",
  password: "Telescopio923@"
};



test('la sesión persiste después de refrescar la página', async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.login(user.email, user.password);

  // Validar que llegó al dashboard
  await expect(loginPage.page).toHaveURL('https://practicesoftwaretesting.com/account');

  // Refrescar
  await loginPage.page.reload();

  // Seguir en dashboard, sin pedir login otra vez
  await expect(loginPage.page).toHaveURL('https://practicesoftwaretesting.com/account');
});

test('la sesión persiste al navegar a otra sección', async ({ loginPage }) => {

  const BotonPerfil = '[data-test="nav-profile"]';

  await loginPage.goto();
  await loginPage.login(user.email, user.password);

  // Validar dashboard inicial
  await expect(loginPage.page).toHaveURL('https://practicesoftwaretesting.com/account');

  // Navegar a otra sección (ejemplo: Orders)
  loginPage.page.click(BotonPerfil);

  // Validar que está en la sección de órdenes
  await expect(loginPage.page).toHaveURL(/.*\/account\/profile/);

  // Volver al dashboard
  await loginPage.page.goBack();

  // La sesión sigue activa
  await expect(loginPage.page).toHaveURL('https://practicesoftwaretesting.com/account');
});
