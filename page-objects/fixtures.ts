import { test as base } from '@playwright/test';
import { LoginPage } from './LoginPage';
import { RegisterPage } from './RegisterPage';
import { ProductsPage } from './ProductsPage';
import { CartPage } from './CartPage';

type Fixtures = {
  loginPage: LoginPage;
  registerPage: RegisterPage;
  productsPage: ProductsPage;
  cartPage: CartPage;
};

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  registerPage: async ({ page }, use) => {
    await use(new RegisterPage(page));
  },
  productsPage: async ({ page }, use) => {
    await use(new ProductsPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
});

export { expect } from '@playwright/test';
