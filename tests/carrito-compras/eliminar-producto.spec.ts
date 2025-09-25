import { test, expect } from '../../core/fixtures';

test('Eliminar producto del carrito', async ({ loginPage, productsPage, cartPage }) => {
  const productId = '01K5Z2QDPEB8ST343PR4AZHXVK';
  const productName = "Pliers";

  // Login
  await loginPage.goto();
  await loginPage.login('admin@practicesoftwaretesting.com', 'welcome01');
  await expect(loginPage.page).toHaveURL(/\/admin\/dashboard/);

  // Seleccionar producto desde Home
  await productsPage.gotoHome();

  // Seleccionar producto desde Home
  await productsPage.gotoHome();
  await productsPage.selectProduct(productId);

  // Agregar al carrito
  await productsPage.addToCart();

  // Abrir carrito y verificar que esté agregado
  await cartPage.open();
  let products = await cartPage.getProductNames();
  expect(products.map(p => p.trim())).toContain(productName);

  // Eliminar producto
  await cartPage.removeProduct(productName);

  // Verificar que ya no esté
  products = await cartPage.getProductNames();
  expect(products.map(p => p.trim())).not.toContain(productName);
});
