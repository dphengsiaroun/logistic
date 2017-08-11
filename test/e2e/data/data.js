'use strict';

const path = require('path');
const data = {};
module.exports = data;

data.mainUrl = 'http://localhost:8000/app/';

data.trucks = [{
	name: '110000-111-15',
	model: 'Volvo',
	city: 'Abi Youcef',
	transportCategory: 'Camion',
	transportTruckType: 'Citerne',
	birthyear: '2014',
	imageId: path.resolve(__dirname, './img/camion-citerne.jpg')
}, {
	name: '120000-222-16',
	model: 'Renault',
	city: 'Abi Youcef',
	transportCategory: 'Camion',
	transportTruckType: 'Semi-remorque',
	birthyear: '2010',
	imageId: path.resolve(__dirname, './img/semi-remorque.jpg')
}];

data.carrierAd = [{
	truck: data.trucks[0],
	priceWantedPerKm: '50',
}, {
	truck: data.trucks[1],
	priceWantedPerKm: '90',
}];

data.loaderAd = [{
	transportCategory: 'Camion',
	transportTruckType: 'Semi-remorque',
	departureCity: 'Abi Youcef',
	arrivalCity: 'Abdelmalek Ramdane',
	conditioning: 'Colis',
	typeOfGoods: 'Classique',
	weightIntervals: 'De 20 à 50 kg',
	preciseWeight: '100',
	imageId: path.resolve(__dirname, './img/palette.jpg'),
	priceWanted: '3200',
	title: 'Chargement de palette'
}, {
	transportCategory: 'Camion',
	transportTruckType: 'Porte voiture',
	departureCity: 'Abi Youcef',
	arrivalCity: 'Abdelmalek Ramdane',
	conditioning: 'Colis',
	typeOfGoods: 'Massif',
	weightIntervals: 'De 1 à 5 tonnes',
	preciseWeight: '1500',
	imageId: path.resolve(__dirname, './img/voiture.jpg'),
	priceWanted: '28000',
	title: 'Chargement de voiture'
}];

data.users = [{
	lastname: 'Debbah',
	firstname: 'Mérouane',
	login: 'Toto',
	email: 'dphengsiaroun@outlook.fr',
	profile: 'both',
	street: '99 rue de Paris',
	city: 'Torcy',
	zipcode: '77200',
	country: 'France',
	password: 'test',
	phone: '0654342214'

}, {
	lastname: 'Phengsiaroun',
	firstname: 'Dany',
	login: 'Dany',
	email: 'dphengsiaroun@outlook.fr2',
	profile: 'carrier',
	street: '10 rue de Paris',
	city: 'Torcy',
	zipcode: '77200',
	country: 'France',
	password: 'test',
	phone: '0754342214'
}];

data.proposals = [{


	},
	{

	}
];

data.passwordMailFile = path.resolve(__dirname, '../../../app/ws/logs/temp-mail-password.log');
