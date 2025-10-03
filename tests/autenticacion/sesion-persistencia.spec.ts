import { test, expect } from '../../core/fixtures';

test.beforeEach(async ({ loginPage, dashboardPage }) => {
  await loginPage.goto();
  await loginPage.login('customer@practicesoftwaretesting.com', 'welcome01');
  await dashboardPage.assertOnDashboard();
});

test('la sesión persiste después de refrescar la página', async ({ dashboardPage, page }) => {

  // Refrescar
  await page.reload();

  // Seguir en dashboard, sin pedir login otra vez
  await dashboardPage.assertOnDashboard();
});

test('la sesión persiste al navegar a otra sección', async ({ dashboardPage, page }) => {

  // Navegar al perfil
  await dashboardPage.gotoProfile();
  await expect(page).toHaveURL(/.*\/account\/profile/);

  // Volver al dashboard con el botón atrás
  await page.goBack();

  // La sesión sigue activa
  await dashboardPage.assertOnDashboard();
});
