import { test, expect } from '@playwright/test';
import { filesMock } from './fixtures/files';
import { ITEM_TYPES } from '../src/constants';

test.describe('Рендер файлового дерева', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(({ mockData }) => {

      const typedMockData = mockData.map(item => ({
        ...item,
        type: item.type as typeof ITEM_TYPES[number]
      }));
      window.getFilesOverride = () => Promise.resolve(typedMockData);
    }, { mockData: filesMock });
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('загрузка страницы и отображение заголовка', async ({ page }) => {
    await expect(page).toHaveTitle(/RSHB/);
    await expect(page.locator('h3')).toBeVisible();
  });

  test('отображение элементов файлового дерева', async ({ page }) => {
    await expect(page.getByText('second')).toBeVisible();
    await expect(page.getByText('test')).toBeVisible();
  });

  test('переход в папку при клике', async ({ page }) => {
    await page.getByText('second').click();
    await expect(page.locator('h3')).toContainText('second');
  });

  test('переход на уровень выше при клике на кнопку вверх', async ({ page }) => {
    await page.getByText('second').click();
    await expect(page.locator('h3')).toContainText('second');
    
    const upButton = page.getByText('...');
    await expect(upButton).toBeVisible();
    
    await upButton.click();
    await expect(page.locator('h3')).toContainText('Тестовые данные');
  });
});

test.describe('Добавление в избранное', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(({ mockData }) => {
      const typedMockData = mockData.map(item => ({
        ...item,
        type: item.type as typeof ITEM_TYPES[number]
      }));
      window.getFilesOverride = () => Promise.resolve(typedMockData);
    }, { mockData: filesMock });
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('удаление из избранного', async ({ page }) => {
    // Перехватываем и переопределяем запрос на изменение избранного
    await page.addInitScript(() => {
      window.toggleItemFavoriteOverride = (id, isFavorite) => {
        return Promise.resolve({ success: true, isFavorite });
      };
    });
    
    const favoriteElem = page.getByRole('link', { name: 'test' });
    await expect(favoriteElem).toBeVisible();

    const favoriteButton = favoriteElem.getByRole('button');
    await expect(favoriteButton).toBeVisible();
    await expect(favoriteButton).toHaveClass(/favoriteActive/);
    
    await favoriteButton.click();
    await page.waitForTimeout(500);
    await expect(favoriteButton).not.toHaveClass(/favoriteActive/);

    await favoriteButton.click();
    await page.waitForTimeout(500);
    await expect(favoriteButton).toHaveClass(/favoriteActive/);
  });
});
