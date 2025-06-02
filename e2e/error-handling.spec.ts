import { test, expect } from '@playwright/test';

// Расширяем интерфейс Window для доступа к хранилищу Zustand
declare global {
  interface Window {
    useAppStore: {
      getState: () => any;
      setState: (state: any) => void;
    };
  }
}

test.describe('Состояния загрузки и ошибки', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('должно показывать скелетон загрузки', async ({ page }) => {
    // Имитируем состояние загрузки
    await page.addInitScript(() => {
      window.addEventListener('load', () => {
        const store = window.useAppStore.getState();
        window.useAppStore.setState({
          ...store,
          isLoading: true,
          error: null
        });
      });
    });

    // Перезагружаем страницу
    await page.reload();
    
    // Проверяем наличие скелетона загрузки
    // Используем first() для выбора одного элемента из нескольких
    await expect(page.locator('[class*="skeletonItem"]').first()).toBeVisible();
    await expect(page.locator('[class*="skeletonItem"]')).toHaveCount(3);
  });

  test('должно показывать компонент ошибки', async ({ page }) => {
    // Имитируем ошибку
    await page.addInitScript(() => {
      window.addEventListener('load', () => {
        const store = window.useAppStore.getState();
        window.useAppStore.setState({
          ...store,
          isLoading: false,
          error: 'Ошибка загрузки данных'
        });
      });
    });

    // Перезагружаем страницу
    await page.reload();
    
    // Проверяем наличие компонента ошибки
    await expect(page.locator('[class*="error"]').first()).toBeVisible();
    await expect(page.locator('h3:has-text("Произошла ошибка")').first()).toBeVisible();
  });

  test('должно показывать сообщение о пустой папке', async ({ page }) => {
    // Имитируем пустую папку
    await page.addInitScript(() => {
      window.addEventListener('load', () => {
        const store = window.useAppStore.getState();
        const emptyFolder = {
          id: 999,
          type: 'dir',
          parentId: 1,
          name: 'Пустая папка',
          isFavorite: false,
          children: []
        };
        window.useAppStore.setState({
          ...store,
          isLoading: false,
          error: null,
          currentFolder: emptyFolder
        });
      });
    });

    // Перезагружаем страницу
    await page.reload();
    
    // Проверяем наличие сообщения о пустой папке
    await expect(page.getByText('Папка пуста')).toBeVisible();
  });
});
