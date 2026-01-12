import { test, expect } from "@playwright/test";

import { MainPage, RegisterPage, ProfilePage, EditorPage, ArticlePage} from "../pages/index";
import { faker } from "@faker-js/faker";

const URL = 'https://realworld.qa.guru/#/';

test.describe('Авторизация',() => {
    test.beforeEach(async({page}) => {
        await page.goto(URL);
        
        const mainPage = new MainPage(page);
        const registerPage = new RegisterPage(page);

        await mainPage.gotoLogin();
        await registerPage.login();
    });

    test ('Создание статьи авторизованным пользователем', async({
        page,
    }) => {
        const post = {
            title:faker.word.words(2),
            description:faker.internet.emoji(),
            text:faker.word.words(15),
            tags:faker.word.words(1)
        };

        const mainPage = new MainPage(page);
        const editorPage = new EditorPage(page);

        await mainPage.gotoCreatePost();
        await editorPage.createPost(post);
        await expect(page.getByRole('heading')).toContainText(post.title);
        await expect(page.getByRole('paragraph')).toContainText(post.text);
    });

    test ('Добавление комментария на первую статью', async({
        page,
    }) => {
        const comment = faker.word.words(1)
        
        const mainPage = new MainPage(page);
        const articlePage = new ArticlePage(page);

        await mainPage.gotoGlobalPosts();
        await mainPage.gotoFirstPost();
        await articlePage.createComment(comment);
        await expect(page.getByRole('main')).toContainText(comment);
    });

    test ('Редактирование собственной статьи', async({
        page,
    }) => {
        const post = {
            title:faker.word.words(1),
            description:faker.internet.emoji(),
            text:faker.word.words(15),
            tags:faker.word.words(1)
        };

        const mainPage = new MainPage(page);
        const editorPage = new EditorPage(page);
        const articlePage = new ArticlePage(page);

        await mainPage.gotoProfile();
        await mainPage.gotoFirstPost();
        await articlePage.editPostBut();
        await editorPage.editPost(post);
        await expect(page.getByRole('heading')).toContainText(post.title);
        await expect(page.getByRole('main')).toContainText(post.text);
    });

    test.only ('Удаление собственной статьи', async({
        page,
    }) => {

        const mainPage = new MainPage(page);
        const articlePage = new ArticlePage(page);

        await mainPage.gotoProfile();
        await mainPage.gotoFirstPost();
        await articlePage.deletePost();
        await expect(page).toHaveURL(URL);
    });
});

 test ('Редактирование информации пользователя через настройки профиля', async({
        page,
    }) => {
        const mainPage = new MainPage(page);
        const registerPage = new RegisterPage(page);
        
        const user = { 
            name:faker.internet.displayName(),
            email:faker.internet.email(),
            password: faker.internet.password()
        };
        const userEdit = { 
            photoURL:faker.image.avatar(),
            name:faker.internet.displayName(),
            bio:faker.word.words(15),
            password: faker.internet.password()
        };
        // Регистрация нового пользователя
        await page.goto(URL);
        await mainPage.gotoRegister();
        await registerPage.register(user);
        // Переход и редактирование пользовательской информации
        await mainPage.gotoProfile();
        await mainPage.gotoProfileSettings();
        await registerPage.updateProfile(userEdit);
        await expect(page.getByText(userEdit.name)).toBeVisible();
    });
