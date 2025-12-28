
export class RegisterPage {

	user = {
		email: 'mail@mail.ru',
		password: '12345',
	}
	
    constructor(page) {
		// техническое описание страницы
		//todo нейминг
		this.nameInput = page.getByRole('textbox', { name: 'Your Name' });
		this.emailInput = page.getByRole('textbox', { name: 'Email' });
		this.passwordInput = page.getByRole('textbox', { name: 'Password' });
		this.signupButton = page.getByRole('button', { name: 'Sign up' });
        this.loginButton = page.getByRole('button', { name: 'Login' });
		this.emailErrorText = page.getByText('Email already exists.. try logging in',);
		this.profilePicture = page.getByRole('textbox', { name: 'URL of profile picture' });
		this.bioInput = page.getByRole('textbox', { name: 'Short bio about you'});
		this.updateButton = page.getByRole('button', { name: 'Update Settings' });
	}
	// Регистрация
	async register(user) {
		const { name, email, password } = user;
		await this.nameInput.click();
		await this.nameInput.fill(name);
		await this.emailInput.click();
		await this.emailInput.fill(email);
		await this.passwordInput.click();
		await this.passwordInput.fill(password);
		await this.signupButton.click();
	}

    // Авторизация
    async login (email = this.user.email ,password = this.user.password) {
        //const {email,password} = user;
        await this.emailInput.click();
		await this.emailInput.fill(email);
		await this.passwordInput.click();
		await this.passwordInput.fill(password);
		await this.loginButton.click();
    }
    // Редактирование профиля пользователя
	async updateProfile(userEdit) {
		const { photoURL, name, bio, password } = userEdit;
        await this.profilePicture.click();
        await this.profilePicture.fill(photoURL);
		await this.nameInput.click();
		await this.nameInput.fill(name);
        await this.bioInput.click();
        await this.bioInput.fill(bio);
		//await this.emailInput.click();
		//await this.emailInput.fill(email);
		await this.passwordInput.click();
		await this.passwordInput.fill(password);
		await this.updateButton.click();
	}
}