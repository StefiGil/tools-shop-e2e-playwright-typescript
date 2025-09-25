import { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartNav: Locator;
  readonly productNames: Locator;
  totalPrice: any;

  constructor(page: Page) {
    this.page = page;
    this.cartNav = page.locator('[data-test="nav-cart"]');
    this.productNames = page.locator('[data-test="product-name"]');
  }

  async open() {
    await this.cartNav.click();
  }

  async getProductNames(): Promise<string[]> {
    const productTitles = this.page.locator('[data-test="product-title"]');
    await productTitles.first().waitFor({ state: 'visible' });
    return productTitles.allTextContents();
  }

  async removeProduct(productName: string) {
    const productRow = this.page.locator(`.cart-item:has-text("${productName}")`);
    await productRow.locator('.remove-button').click();
  }

  async updateQuantity(productName: string, quantity: number) {
    const productRow = this.page.locator(`.cart-item:has-text("${productName}")`);
    const qtyInput = productRow.locator('.quantity-input');
    await qtyInput.fill(quantity.toString());
  }

  async getSubtotal(productName: string): Promise<number> {
    const productRow = this.page.locator(`.cart-item:has-text("${productName}")`);
    const subtotalText = await productRow.locator('.subtotal').innerText();
    return parseFloat(subtotalText.replace(/[^0-9.]/g, ''));
  }

  async getTotal(): Promise<number> {
    const totalText = await this.page.locator('.cart-total').innerText();
    return parseFloat(totalText.replace(/[^0-9.]/g, ''));
  }

}
