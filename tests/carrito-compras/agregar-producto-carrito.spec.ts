import { test, expect } from '../../page-objects/fixtures';
import products from '../../data/products.json';

test('Agregar producto al carrito desde Home', async ({ loginPage, productsPage, cartPage }) => {
  const productId = '01K5Z2QDPAFK4GPS3XJ8FWKMBJ';
  const productName = "Combination Pliers";

  // Login
  await loginPage.goto();
  await loginPage.login('admin@practicesoftwaretesting.com', 'welcome01');
  await expect(loginPage.page).toHaveURL(/\/admin\/dashboard/);

  // Seleccionar producto desde Home
  await productsPage.gotoHome();
  await productsPage.selectProduct(productId);

  // Agregar al carrito
  await productsPage.addToCart();

  // Abrir carrito y verificar producto
  await cartPage.open();
  const products = (await cartPage.getProductNames()).map(p => p.trim());
  expect(products).toContain(productName.trim());
});


test('Agregar varios productos al carrito desde Home', async ({ loginPage, productsPage, cartPage }) => {
  test.setTimeout(60000);
  // Login
  await loginPage.goto();
  await loginPage.login('admin@practicesoftwaretesting.com', 'welcome01');
  await expect(loginPage.page).toHaveURL(/\/admin\/dashboard/);

  // Ir a Home
  await productsPage.gotoHome();

  // Agregar todos los productos del JSON
  for (const product of products) {
    await productsPage.selectProduct(product.id);
    await productsPage.addToCart();

    // Volver a Home para agregar el siguiente
    await productsPage.gotoHome();
  }

  // Abrir carrito
  await cartPage.open();

  // Obtener productos en el carrito
  const productsInCart = (await cartPage.getProductNames()).map(p => p.trim());

  // Validar que todos los nombres esperados estén en el carrito
  for (const product of products) {
    expect(productsInCart).toContain(product.name.trim());
  }
});
