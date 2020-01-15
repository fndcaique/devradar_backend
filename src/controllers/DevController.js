const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('./../utils/parseStringAsArray');

// index, show, store, update, destroy

module.exports = {

  async index(request, response) {
    const devs = await Dev.find();

    return response.json(devs);
  },

  async store(request, response) {

    let status

    const { github_username, techs, latitude, longitude } = request.body;

    console.log({ github_username, techs, latitude, longitude });

    let dev = await Dev.findOne({ github_username });

    if (!dev) {
      try {
        const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`); let { name, avatar_url, bio } = apiResponse.data;

        if (!name) name = apiResponse.data.login;

        try {
          const techsArray = parseStringAsArray(techs);
          const location = {
            type: 'Point',
            coordinates: [longitude, latitude]
          }
          try {
            dev = await Dev.create({
              github_username,
              name,
              avatar_url,
              bio,
              techs: techsArray,
              location
            });
          } catch (err) {
            console.log('Erro ao salvar dev na base de dados\n' + err);
            delete err.stack;
            return response.status(500).json({ message: 'Erro ao salvar dev na base de dados' });;
          }
        } catch (err) {
          console.log('Error in function parStringAsArray')
          return response.status(400).json({ message: 'As techs devem ser enviadas numa unica string e separadas por vírgula' });
        }
      } catch (err) {
        console.log('github_username inválido\n' + err);
        delete err.stack;
        return response.status(404).json({ message: 'github_username inválido' });
      }

    }
    return response.json(dev);
  },

  async update(request, response) {
    const { _id } = request.params;
    const { techs, latitude, longitude } = request.body;
    let dev = await Dev.findById(_id);
    if (dev) {
      const apiResponse = await axios.get(`https://api.github.com/users/${dev.github_username}`);

      let { name, avatar_url, bio } = apiResponse.data;

      if (!name) name = apiResponse.data.login;

      const techsArray = parseStringAsArray(techs);

      const location = {
        type: 'Point',
        coordinates: [longitude, latitude]
      }
      dev = await Dev.updateOne({ _id },
        {
          name,
          avatar_url,
          bio,
          techs: techsArray,
          location
        }
      );
    }
    return response.json(dev);
  },

  async destroy(request, response) {
    const { _id } = request.params;
    const dev = await Dev.deleteOne({ _id });
    return response.json(dev);
  }
}