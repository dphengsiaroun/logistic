describe('User CRUD', function() {

	beforeEach(function() {
		console.log('Test', arguments);
	});

	it('should create a user', function() {
		browser.get('http://localhost:8000/app/');
		element(by.css('menu-bar')).click();
		element(by.linkText('Se connecter')).click();
		element(by.linkText('Créer un nouveau compte')).click();
		element(by.css('button')).click();
		// browser.sleep(35000);
		var message = element(by.css('h2'));
		expect(message.getText()).toEqual('Votre compte est créé.');
		element(by.css('button')).click();
		expect(browser.getCurrentUrl()).toEqual('http://localhost:8000/app/');
	});

	it('should retrieve a user', function() {
		browser.driver.navigate().refresh();
		expect(browser.getCurrentUrl()).toEqual('http://localhost:8000/app/');
		element(by.css('menu-bar')).click();
		var link = element(by.linkText('Mon profil'));
		expect(link).toBeDefined();
	});

	it('should update a user', function() {
		element(by.linkText('Mon profil')).click();
		element(by.css('[name=lastname]')).clear().sendKeys('Phengsiaroun');
		element(by.css('button')).click();
		expect(browser.getCurrentUrl()).toEqual('http://localhost:8000/app/updated-profile');
		element(by.css('button')).click();
		expect(browser.getCurrentUrl()).toEqual('http://localhost:8000/app/');
	});

	it('should delete a user', function() {
		element(by.css('menu-bar')).click();
		element(by.linkText('Mon profil')).click();
		element(by.linkText('Supprimer mon compte')).click();
		element.all(by.css('button.confirm')).click();
		element.all(by.css('button.ok')).click();
	});
});
