import { Page, Locator } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;
  readonly profileNav: Locator;
  readonly invoicesNav: Locator;
  readonly homeNav: Locator;
  readonly cartNav: Locator;
  readonly logoutNav: Locator;

  constructor(page: Page) {
    this.page = page;
    this.profileNav = page.locator('[data-test="nav-profile"]');
    this.invoicesNav = page.locator('[data-test="nav-invoices"]');
    this.homeNav = page.locator('[data-test="nav-home"]');
    this.cartNav = page.locator('[data-test="nav-cart"]');
    this.logoutNav = page.locator('[data-test="nav-sign-out"]');
  }

  async gotoProfile() {
    await this.profileNav.click();
    await this.page.waitForURL(/.*\/account\/profile/);
  }

  async gotoInvoices() {
    await this.invoicesNav.click();
    await this.page.waitForURL(/.*\/account\/invoices/);
  }

  async gotoHome() {
    await this.homeNav.click();
    await this.page.waitForURL(/.*\/$/);
  }

  async gotoCart() {
    await this.cartNav.click();
    await this.page.waitForURL(/.*\/checkout/);
  }

  async logout() {
    await this.logoutNav.click();
    await this.page.waitForURL(/.*\/auth\/login/);
  }

  async assertOnDashboard() {
    await this.page.waitForURL(/.*\/account/);
  }
}
