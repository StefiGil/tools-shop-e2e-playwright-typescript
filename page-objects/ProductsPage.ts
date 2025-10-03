import { Page, Locator } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;
  readonly homeNav: Locator;
  readonly addToCartButton: Locator;
  readonly toastMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.homeNav = page.locator('[data-test="nav-home"]');
    this.addToCartButton = page.locator('[data-test="add-to-cart"]');
    this.toastMessage = page.locator('text=Product added to shopping cart');
  }

  async selectProduct(name: string) {
    const productCard = this.page.locator('[data-test="product-name"]', { hasText: name });
    await productCard.click();
    await this.page.waitForURL(new RegExp(/\/product\//));
  }

    async selectMultiProducts(name: string) {
      // Esperar a que cargue la grilla de productos
    await this.page.locator('[data-test^="product-"]').first().waitFor({ state: 'visible' });
    
    const productCard = this.page.locator('[data-test="product-name"]').getByText(name, { exact: true });
    
    await productCard.first().waitFor({ state: 'visible' });
    await productCard.click();
    await this.page.waitForURL(new RegExp(/\/product\//));
  }

  async addToCart() {
    await this.addToCartButton.click();
    await this.toastMessage.waitFor({ state: 'visible' });
  }
}
