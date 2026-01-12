export class ProfilePage {
	constructor(page) {
		// техническое описание страницы
		//todo нейминг
        this.profilePicture = page.getByRole('textbox', { name: 'URL of profile picture' })
		this.nameInput = page.getByRole('textbox', { name: 'Your Name' });
        this.bioInput = page.getByRole('textbox', { name: 'Short bio about you'});
		this.emailInput = page.getByRole('textbox', { name: 'Email' });
		this.passwordInput = page.getByRole('textbox', { name: 'Password' });
		this.updateButton = page.getByRole('button', { name: 'Update Settings' });
		
	}
	// бизнесовые действия со страницой
	async update(user) {
		const { photoURL, name, bio } = user;
        await this.profilePicture.click();
        await this.profilePicture.fill(photoURL);
		await this.nameInput.click();
		await this.nameInput.fill(name);
        await this.bioInput.click();
        await this.bioInput.fill(bio);
		//await this.emailInput.click();
		//await this.emailInput.fill(email);
		//await this.passwordInput.click();
		//await this.passwordInput.fill(password);
		await this.updateButton.click();
	}
}