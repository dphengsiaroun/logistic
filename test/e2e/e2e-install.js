describe('Install', function() {

	beforeEach(function() {
		console.log('Test', arguments);
	});

	it('should uninstall', function() {
		browser.get('http://localhost:8000/app/install');
		element(by.css('button')).click();

		// browser.sleep(35000);
		var message = element(by.css('h1'));
		expect(message.getText()).toEqual('Installation');
		// element.all(by.css('button')).click();
		// expect(latestResult.getText()).toEqual('3');
	});



	it('should install', function() {
		element(by.xpath("//label[@for='dbCreation']")).click();
		element(by.css('button')).click();
		var message = element(by.css('h3'));
		expect(message.getText()).toEqual('Successfully installed');
	});

	it('should go to website', function() {
		element(by.linkText('Go to website')).click();
		expect(browser.getCurrentUrl()).toEqual('http://localhost:8000/app/');
	});
});
