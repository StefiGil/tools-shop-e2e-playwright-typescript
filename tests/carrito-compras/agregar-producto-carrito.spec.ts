import { test, expect } from '../../core/fixtures';
import products from '../../data/products.json';

  test.beforeEach(async ({ loginPage, dashboardPage, page}) => {
    test.setTimeout(70000);
    await loginPage.goto();
    await loginPage.login('customer@practicesoftwaretesting.com', 'welcome01');
    await expect(page).toHaveURL(/\/account/);
    await dashboardPage.gotoHome();
  });

test('Agregar producto al carrito desde Home', async ({ productsPage, cartPage }) => {
  const productName = "Combination Pliers";

  // Seleccionar producto desde Home
  await productsPage.selectProduct(productName);

  // Agregar al carrito
  await productsPage.addToCart();

  // Abrir carrito y verificar producto
  await cartPage.open();
  const products = (await cartPage.getProductNames()).map(p => p.trim());
  expect(products).toContain(productName.trim());
});


test('Agregar varios productos al carrito desde Home', async ({ productsPage, cartPage, page }) => {

  // Agregar todos los productos del JSON
  for (const product of products) {
    await productsPage.selectMultiProducts(product.name);
    await productsPage.addToCart();

  // Volver al dashboard con el botón atrás
  await productsPage.page.goBack();
  }

  // Abrir carrito
  await cartPage.open();

  // Obtener productos en el carrito
  const productsInCart = (await cartPage.getProductNames()).map(p => p.trim());

  // Refrescar
  await page.reload();

  // Esperar a que se carguen TODOS los productos esperados
  await expect(page.locator('[data-test="product-title"]')).toHaveCount(products.length,{timeout:20000});
  // AHORA SÍ obtener productos en el carrito (DESPUÉS de esperar)
  const refreshedProductsInCart = (await cartPage.getProductNames()).map(p => p.trim());

  console.log('Productos en el carrito:', refreshedProductsInCart);

  // Validar que todos los nombres esperados estén en el carrito
  for (const product of products) {
    expect(refreshedProductsInCart).toContain(product.name.trim());
  }
});
