import { test, expect } from '../../core/fixtures';
import products from '../../data/products.json';

test.beforeEach(async ({ loginPage, dashboardPage, page }) => {
  test.setTimeout(50000);
  await loginPage.goto();
  await loginPage.login('customer@practicesoftwaretesting.com', 'welcome01');
  await expect(page).toHaveURL(/\/account/);
  await dashboardPage.gotoHome();
});

test('Validar persistencia del carrito tras navegar y refrescar', async ({ dashboardPage, productsPage, cartPage, page }) => {
  // Tomar el primer producto del JSON
  const productName = products[0].name;

  // Agregar el producto al carrito
  await productsPage.selectMultiProducts(productName);
  await productsPage.addToCart();

  // Ir al carrito y verificar que esté visible
  await cartPage.open();
  const productTitles = page.locator('[data-test="product-title"]');
  await expect(productTitles.first()).toBeVisible();
  let productsInCart = await productTitles.allTextContents();
  expect(productsInCart.map(p => p.trim())).toContain(productName);

  // Navegar al Home nuevamente
  await dashboardPage.gotoHome();

  // Volver al carrito y verificar que el producto sigue presente
  await cartPage.open();

  await page.locator('[data-test="product-title"]').first().waitFor({ state: 'visible' });

  productsInCart = (await productTitles.allTextContents()).map(p => p.trim());
  expect(productsInCart).toContain(productName);

  // Refrescar la página
  await page.reload();

  await page.locator('[data-test="product-title"]').first().waitFor({ state: 'visible' });

  // Confirmar que el producto sigue después del refresh
  const refreshedProducts = (await productTitles.allTextContents()).map(p => p.trim());
  expect(refreshedProducts).toContain(productName);

  console.log(`✅ Producto "${productName}" persiste correctamente tras navegación y refresh`);
});
