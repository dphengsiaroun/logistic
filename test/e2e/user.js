describe('User CRUD', function() {

	beforeEach(function() {
		console.log('Test', arguments);
	});

	it('should create a user', function() {
		browser.get('http://localhost:8000/app/');
		element.all(by.css('menu-bar')).click();
		element.all(by.linkText('Se connecter')).click();
		element.all(by.linkText('Créer un nouveau compte')).click();
		element.all(by.css('button')).click();
		// browser.sleep(35000);
		var message = element(by.css('h2'));
		expect(message.getText()).toEqual('Votre compte est créé.');
		element(by.css('button')).click();
		expect(browser.getCurrentUrl()).toEqual('http://localhost:8000/app/');
	});

	it('should retrieve a user', function() {
		browser.driver.navigate().refresh();
		expect(browser.getCurrentUrl()).toEqual('http://localhost:8000/app/');
		element.all(by.css('menu-bar')).click();
		var link = element(by.linkText('Mon profil'));
		expect(link).toBeDefined();
	});

	it('should update a user', function() {
		
		element.all(by.linkText('Se connecter')).click();
		element.all(by.css('button')).click();
		element.all(by.css('i.fa.fa-bars')).click();
		element.all(by.linkText('Mon profil')).click();
		element.all(by.xpath('//ui-view/lg-user-retrieve-route/form/input[3]')).sendKeys('2');
		element.all(by.xpath('//ui-view/lg-user-retrieve-route/form/input[4]')).sendKeys('2');
		element.all(by.xpath('//ui-view/lg-user-retrieve-route/form/input[1]')).sendKeys('2');
		element.all(by.xpath('//ui-view/lg-user-retrieve-route/form/input[2]')).sendKeys('2');
		element.all(by.css('button')).click();
		element.all(by.css('button.ng-binding')).click();
	});

	// it('should delete a user', function() {
	// 	element.all(by.css('i.fa.fa-bars')).click();
	// 	element.all(by.linkText('Se connecter')).click();
	// 	element.all(by.xpath('//ui-view/lg-connection-signin-route/sign-form/form/input[1]')).sendKeys('2');
	// 	element.all(by.css('button')).click();
	// 	element.all(by.css('i.fa.fa-bars')).click();
	// 	element.all(by.linkText('Mon profil')).click();
	// 	element.all(by.linkText('Supprimer mon compte')).click();
	// 	element.all(by.css('button.critical.ng-binding')).click();
	// 	element.all(by.css('button.ng-binding')).click();
	// });
});
