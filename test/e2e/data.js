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
}];
data.carrierAd = {
    priceWantedPerKm: '50'
};
