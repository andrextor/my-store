const boom = require('@hapi/boom');
const pool = require('../libs/mysql.pool.js')
const { models } = require('../libs/sequelize.js');

class UserService {
  constructor() { }

  async create(data) {
    return data
  }

  async find() {

    const response = await models.User.findAll();
    // const query = 'SELECT * FROM tasks';
    //const [results] = await pool.execute(query);
    //const [data] = await sequelize.query(query);

    return response;
  }
  async findOne(id) {
    return { id }
  }

  async update(id, changes) {
    return { id }
  }
}

module.exports = UserService;
