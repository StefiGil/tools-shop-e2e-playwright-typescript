import { test, expect } from '../../core/fixtures';

  test.beforeEach(async ({ loginPage, dashboardPage }) => {
    await loginPage.goto();
    await loginPage.login('customer@practicesoftwaretesting.com', 'welcome01');
    await dashboardPage.assertOnDashboard();
  });

test('la sesión persiste después de refrescar la página', async ({ loginPage, dashboardPage }) => {

  // Refrescar
  await dashboardPage.page.reload();

  // Seguir en dashboard, sin pedir login otra vez
  await dashboardPage.assertOnDashboard();
});

test('la sesión persiste al navegar a otra sección', async ({ loginPage, dashboardPage }) => {

  // Navegar al perfil
  await dashboardPage.gotoProfile();
  await expect(dashboardPage.page).toHaveURL(/.*\/account\/profile/);

  // Volver al dashboard con el botón atrás
  await dashboardPage.page.goBack();

  // La sesión sigue activa
  await dashboardPage.assertOnDashboard();
});
