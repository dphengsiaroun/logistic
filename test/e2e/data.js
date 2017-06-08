'use strict';

const path = require('path');
var data = {};
module.exports = data;

data.trucks = [{
		name: '132443-123-15',
		model: 'Volvo',
		city: 'Abi Youcef',
		transportCategory: 'Camion',
		transportTruckType: 'Semi-remorque',
		birthyear: '2014',
		imageId: path.resolve(__dirname, './img/camion-citerne.jpg')
	},
	{
		name: '132443-123-15',
		model: 'Volvo',
		city: 'Abi Youcef',
		transportCategory: 'Camion',
		transportTruckType: 'Semi-remorque',
		birthyear: '2014',
		imageId: path.resolve(__dirname, './img/semi-remorque.jpg')
	}
];

data.carrierAd = {
	priceWantedPerKm: '50'
};

data.users = [{
		lastname: 'Debbah',
		firstname: 'Mérouane',
		login: 'Meme',
		email: 'dphengsiaroun@outlook.fr',
		profile: 'both',
		street: '99 rue de Paris',
		city: 'Torcy',
		zipcode: '77200',
		country: 'France',
        password: 'test'

	},
	{
		lastname: 'Phengsiaroun',
		firstname: 'Dany',
		login: 'Meme',
		email: 'dphengsiaroun@outlook.fr2',
		profile: 'carrier',
		street: '10 rue de Paris',
		city: 'Torcy',
		zipcode: '77200',
		country: 'France',
        password: 'test'
	}
];
