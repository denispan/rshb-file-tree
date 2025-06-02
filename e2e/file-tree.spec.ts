import { test, expect } from '@playwright/test';

test.describe('Файловое дерево', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Ждем загрузку страницы
    await page.waitForLoadState('networkidle');
  });

  test('должно отображать заголовок и элементы', async ({ page }) => {
    // Проверяем заголовок
    await expect(page.locator('h3')).toBeVisible();
    
    // Проверяем наличие элементов
    await expect(page.getByText('second')).toBeVisible();
    await expect(page.getByText('test')).toBeVisible();
  });

  test('должно переходить между папками', async ({ page }) => {
    // Кликаем на папку "second"
    await page.getByText('second').click();
    
    // Проверяем, что заголовок изменился
    await expect(page.locator('h3')).toContainText('second');
  });
});
