import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly searchBox: Locator;
  readonly searchButton: Locator;
  readonly productNames: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchBox = page.getByRole('textbox', { name: 'Search' });
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.productNames = page.getByRole('heading', { level: 5 });
  }

  async goto() {
    await this.page.goto('https://practicesoftwaretesting.com');
  }

  async searchFor(term: string) {
    await this.searchBox.fill(term);
    await this.searchButton.click();
  }

  async allProductNamesContain(term: string): Promise<boolean> {
    const names = await this.productNames.allTextContents();
    return names.length > 0 && names.every((name) => name.toLowerCase().includes(term.toLowerCase()));
  }
}
