const Dev = require('../models/Dev');
const parseStringAsArray = require('./../utils/parseStringAsArray');

// index, show, store, update, destroy

module.exports = {
  async index(request, response) {
    // Buscar todos os devs num raio de 10km
    // Filtrar por tecnologia

    const { latitude, longitude, techs } = request.query;

    const techsArray = parseStringAsArray(techs);

    console.log(techsArray);

    const devs = await Dev.find({
      techs: {
        $in: techsArray,
      },
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude]
          },
          $maxDistance: 10000
        }
      }
    });

    return response.json(devs);
  }
}