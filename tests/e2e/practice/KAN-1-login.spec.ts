import { test, expect } from '../../../src/fixtures';
import { Tags } from '../../../src/utils/tags';
import { trace } from '../../../src/utils/traceability';
import { TestData } from '../../../src/data/TestData';
import { secret } from '../../../config/env.config';

// Plan: test-plans/KAN-1.md (approved)
test.describe('KAN-1 Test Login Page', () => {
  test('valid user logs in successfully', trace('KAN-1', 'TC-01', [Tags.smoke, Tags.regression]), async ({ practiceLoginPage, loggedInPage }) => {
    await practiceLoginPage.open();
    await practiceLoginPage.login(secret('PRACTICE_USERNAME'), secret('PRACTICE_PASSWORD'));
    await loggedInPage.expectUrl(/practicetestautomation\.com\/logged-in-successfully\//);
    await expect(loggedInPage.successMessage).toBeVisible();
    await expect(loggedInPage.logOut).toBeVisible();
  });

  test('invalid username is rejected', trace('KAN-1', 'TC-02', [Tags.regression]), async ({ practiceLoginPage }) => {
    await practiceLoginPage.open();
    await practiceLoginPage.login(TestData.practiceLogin().invalidUsername, secret('PRACTICE_PASSWORD'));
    await expect(practiceLoginPage.error).toHaveText('Your username is invalid!');
    await practiceLoginPage.expectUrl(/\/practice-test-login\/$/);
  });

  test('invalid password is rejected', trace('KAN-1', 'TC-03', [Tags.regression]), async ({ practiceLoginPage }) => {
    await practiceLoginPage.open();
    await practiceLoginPage.login(secret('PRACTICE_USERNAME'), TestData.practiceLogin().invalidPassword);
    await expect(practiceLoginPage.error).toHaveText('Your password is invalid!');
    await practiceLoginPage.expectUrl(/\/practice-test-login\/$/);
  });

  test('logged-in user can log out', trace('KAN-1', 'TC-04', [Tags.regression]), async ({ practiceLoginPage, loggedInPage }) => {
    await practiceLoginPage.open();
    await practiceLoginPage.login(secret('PRACTICE_USERNAME'), secret('PRACTICE_PASSWORD'));
    await loggedInPage.waitUntilLoaded();
    await loggedInPage.logout();
    await practiceLoginPage.expectUrl(/\/practice-test-login\/$/);
    await expect(practiceLoginPage.username).toBeVisible();
  });
});
