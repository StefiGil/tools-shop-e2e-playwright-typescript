import { Page, Locator } from '@playwright/test';

export class RegisterPage {
  readonly page: Page;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly dob: Locator;
  readonly address: Locator;
  readonly postcode: Locator;
  readonly city: Locator;
  readonly state: Locator;
  readonly country: Locator;
  readonly phone: Locator;
  readonly email: Locator;
  readonly password: Locator;
  readonly registerButton: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstName = page.locator('[data-test="first-name"]');
    this.lastName = page.locator('[data-test="last-name"]');
    this.dob = page.locator('[data-test="dob"]');
    this.address = page.locator('[data-test="street"]');
    this.postcode = page.locator('[data-test="postal_code"]');
    this.city = page.locator('[data-test="city"]');
    this.state = page.locator('[data-test="state"]');
    this.country = page.locator('[data-test="country"]');
    this.phone = page.locator('[data-test="phone"]');
    this.email = page.locator('[data-test="email"]');
    this.password = page.locator('[data-test="password"]');
    this.registerButton = page.locator('[data-test="register-submit"]');
    this.successMessage = page.locator('[data-test="register-success"]');
  }

  async goto() {
    await this.page.goto('https://practicesoftwaretesting.com/auth/register');
  }

  async register(user: {
    firstName: string;
    lastName: string;
    dob: string;
    address: string;
    postcode: string;
    city: string;
    state: string;
    country: string;
    phone: string;
    email: string;
    password: string;
  }) {
    await this.firstName.fill(user.firstName);
    await this.lastName.fill(user.lastName);
    await this.dob.fill(user.dob);
    await this.address.fill(user.address);
    await this.postcode.fill(user.postcode);
    await this.city.fill(user.city);
    await this.state.fill(user.state);
    await this.country.selectOption(user.country);
    await this.phone.fill(user.phone);
    await this.email.fill(user.email);
    await this.password.fill(user.password);
    await this.registerButton.click();
  }
}
