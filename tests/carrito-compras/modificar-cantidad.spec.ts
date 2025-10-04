import { test, expect } from '../../core/fixtures';
import products from '../../data/products.json';

test.beforeEach(async ({ loginPage, dashboardPage, page }) => {
  test.setTimeout(50000);
  await loginPage.goto();
  await loginPage.login('customer@practicesoftwaretesting.com', 'welcome01');
  await expect(page).toHaveURL(/\/account/);
  await dashboardPage.gotoHome();
});

test('Agregar productos repetidos y validar cantidad acumulada en carrito', async ({ dashboardPage, productsPage, cartPage, page }) => {
  // 1Tomamos el primer producto del JSON
  const productName = products[0].name;

  // Seleccionar y agregar al carrito una vez
  await productsPage.selectMultiProducts(productName);
  await productsPage.addToCart();
  await productsPage.page.goBack();

  // Ir al carrito y guardar la cantidad inicial
  await cartPage.open();
  const quantityLocator = page.locator(`[data-test="product-quantity"]`);
  await expect(quantityLocator.first()).toBeVisible();
  const initialQuantity = parseInt(await quantityLocator.first().inputValue());

  // Volver al Home y agregar el mismo producto dos veces más
  await dashboardPage.gotoHome();
  for (let i = 0; i < 2; i++) {
    await productsPage.selectMultiProducts(productName);
    await productsPage.addToCart();
    await productsPage.page.goBack();
  }

  // Ir nuevamente al carrito
  await cartPage.open();

  const productTitles = page.locator('[data-test="product-title"]');
  await productTitles.first().waitFor({ state: 'visible' });

  // Refrescar
  await page.reload();

  // 6btener la cantidad actual
  const updatedQuantity = parseInt(await quantityLocator.first().inputValue());

  // Validar que la cantidad acumulada sea la inicial + 2
  expect(updatedQuantity).toBe(initialQuantity + 2);

  console.log(`Cantidad inicial: ${initialQuantity}, Cantidad actual: ${updatedQuantity}`);
});
