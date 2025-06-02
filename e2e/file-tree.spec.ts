import { test, expect } from '@playwright/test';

test.describe('Файловое дерево', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Ждем загрузку страницы
    await page.waitForLoadState('networkidle');
  });

  test('должно отображать корневую папку и ее содержимое', async ({ page }) => {
    // Проверяем заголовок
    await expect(page.locator('h3')).toContainText('Ваши файлы');
    
    // Проверяем наличие всех элементов корневой папки
    await expect(page.getByText('second')).toBeVisible();
    await expect(page.getByText('test')).toBeVisible();
    await expect(page.getByText('third')).toBeVisible();
    await expect(page.getByText('photo.jpg')).toBeVisible();
    
    // Проверяем, что в избранном находятся правильные элементы
    // Проверяем наличие иконок для папок и файлов
    await expect(page.locator('img[src="/icons/folder.svg"]').first()).toBeVisible();
    await expect(page.locator('img[src="/icons/file.svg"]').first()).toBeVisible();
  });

  test('должно переходить между папками и возвращаться назад', async ({ page }) => {
    // Кликаем на папку "second"
    await page.getByText('second').click();
    
    // Проверяем, что заголовок изменился
    await expect(page.locator('h3')).toContainText('second');
    
    // Проверяем наличие кнопки возврата
    const upButton = page.locator('button').filter({ has: page.locator('img[alt="..."]') });
    await expect(upButton).toBeVisible();
    
    // Проверяем содержимое папки
    await expect(page.getByText('Вложенная папка')).toBeVisible();
    
    // Переходим в папку "Вложенная папка"
    await page.getByText('Вложенная папка').click();
    
    // Проверяем, что заголовок изменился
    await expect(page.locator('h3')).toContainText('Вложенная папка');
    
    // Проверяем содержимое папки
    await expect(page.getByText('Глубокое вложение')).toBeVisible();
    
    // Возвращаемся назад
    await upButton.click();
    
    // Проверяем, что вернулись в папку "second"
    await expect(page.locator('h3')).toContainText('second');
    
    // Возвращаемся в корневую папку
    await upButton.click();
    
    // Проверяем, что вернулись в корневую папку
    await expect(page.locator('h3')).toContainText('Ваши файлы');
  });

  test('должно показывать сообщение о пустой папке', async ({ page }) => {
    // Переходим в папку "third", которая пуста
    await page.getByText('third').click();
    
    // Проверяем, что отображается сообщение о пустой папке
    await expect(page.getByText('Папка пуста')).toBeVisible();
  });

  test('должно работать добавление/удаление из избранного', async ({ page }) => {
    // Находим элемент "third", который изначально не в избранном
    const thirdItem = page.locator('a').filter({ hasText: 'third' });
    const favoriteButton = thirdItem.locator('button');
    
    // Проверяем начальное состояние избранного
    await expect(favoriteButton).not.toHaveClass(/favorite/);
    
    // Кликаем на кнопку избранного
    await favoriteButton.click();
    
    // Проверяем, что элемент добавлен в избранное
    await expect(favoriteButton).toHaveClass(/favorite/);
    
    // Кликаем снова, чтобы удалить из избранного
    await favoriteButton.click();
    
    // Проверяем, что элемент удален из избранного
    await expect(favoriteButton).not.toHaveClass(/favorite/);
  });
});
