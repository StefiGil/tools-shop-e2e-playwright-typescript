import { test, expect } from '../../core/fixtures';
import products from '../../data/products.json';

test.beforeEach(async ({ loginPage, dashboardPage, page }) => {
  test.setTimeout(60000);
  await loginPage.goto();
  await loginPage.login('customer@practicesoftwaretesting.com', 'welcome01');
  await expect(page).toHaveURL(/\/account/);
  await dashboardPage.gotoHome();
});

test('Validar que el precio total se actualiza correctamente al agregar productos repetidos', async ({ dashboardPage, productsPage, cartPage, page }) => {
  // Tomar el primer producto del JSON
  const productName = products[0].name;

  // Agregar el producto una vez
  await productsPage.selectMultiProducts(productName);
  await productsPage.addToCart();
  await productsPage.page.goBack();

  // Ir al carrito y guardar el precio inicial
  await cartPage.open();
  const linePriceLocator = page.locator('[data-test="line-price"]');
  await expect(linePriceLocator.first()).toBeVisible();
  const initialLinePriceText = await linePriceLocator.first().innerText();
  const initialLinePrice = parseFloat(initialLinePriceText.replace(/[^0-9.]/g, ''));

  // Volver al Home y agregar el mismo producto dos veces más
  await dashboardPage.gotoHome();
  for (let i = 0; i < 2; i++) {
    await productsPage.selectMultiProducts(productName);
    await productsPage.addToCart();
    await productsPage.page.goBack();
  }

  // Volver al carrito y esperar que los precios estén visibles
  await cartPage.open();
  await page.locator('[data-test="product-title"]').first().waitFor({ state: 'visible' });

  // Refrescar la página por seguridad (en caso de delay del backend)
  await page.reload();

  // Obtener el nuevo precio total del mismo producto
  const updatedLinePriceText = await linePriceLocator.first().innerText();
  const updatedLinePrice = parseFloat(updatedLinePriceText.replace(/[^0-9.]/g, ''));

  // Validar que el nuevo precio = precio inicial * 3
  const expectedPrice = initialLinePrice * 3;
  expect(updatedLinePrice).toBeCloseTo(expectedPrice, 2);

  console.log(`Precio inicial: $${initialLinePrice} | Precio esperado: $${expectedPrice} | Precio actual: $${updatedLinePrice}`);
});
