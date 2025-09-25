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

  async gotoHome() {
    await this.homeNav.click();
  }

  async selectProduct(productId: string) {
    const productCard = this.page.locator(`[data-test="product-${productId}"]`);
    await productCard.click();
    await this.page.waitForURL(new RegExp(`/product/${productId}`));
  }

  async addToCart() {
    await this.addToCartButton.click();
    await this.toastMessage.waitFor({ state: 'visible' });
  }
}
