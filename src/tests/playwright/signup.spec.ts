import { test, expect } from '@playwright/test';

test.describe('Signup Page', () => {
  test('should display signup form correctly', async ({ page }) => {
    // Aller à la page d'inscription
    await page.goto('http://localhost:3000/signup'); 

    // Vérifier que les éléments du formulaire sont bien présents
    await expect(page.locator('label:has-text("Username")')).toBeVisible();
    await expect(page.locator('label:has-text("Email")')).toBeVisible();
    await expect(page.locator('label:has-text("Password")')).toBeVisible();
    await expect(page.getByRole('button', { name: /register/i })).toBeVisible();
  });

  test('should display error messages for invalid inputs', async ({ page }) => {
    // Remplacer par l'URL complète de votre application
    await page.goto('http://localhost:3000/signup');

    // Assurez-vous que le formulaire est chargé
    await page.waitForSelector('input[name="password"]');

    // Entrez des valeurs invalides
    await page.fill('input[name="username"]', '12345');
    await page.fill('input[name="email"]', 'invalid-email');
    await page.fill('input[name="password"]', 'sh');

    // Soumettez le formulaire
    await page.click('button[type="submit"]');

    // Attendez un peu pour que les messages d’erreur apparaissent
    await page.waitForTimeout(2000);

    // Vérifiez les messages d’erreur
    await expect(page.locator('text=Username cannot be all numbers')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('text=Invalid email address')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('text=Password must be at least 4 characters long')).toBeVisible({ timeout: 10000 });
 });

 test('user registered successfully', async ({ page }) => {
    // Aller à la page d'inscription
    await page.goto('http://localhost:3000/signup');

    // Remplir le formulaire d'inscription
    await page.fill('input[name="username"]', 'testuser');
    await page.fill('input[name="email"]', 'testplay@example.com');
    await page.fill('input[name="password"]', 'Password123!');

    await page.click('button[type="submit"]', { timeout: 60000 });
    await page.waitForNavigation({ url: '**/login', timeout: 60000 });

    // Vérifier le message de succès
    await expect(page.locator('text=Successful registration!')).toBeVisible({ timeout: 60000 });
 });
});
