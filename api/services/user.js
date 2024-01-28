const boom = require('@hapi/boom');
const pool = require('../libs/mysql.pool.js')

class UserService {
  constructor() { }

  async create(data) {
    return data
  }

  async find() {

    const [results] = await pool.execute('SELECT * FROM tasks');

    return results
  }
  async findOne(id) {
    return { id }
  }

  async update(id, changes) {
    return { id }
  }
}

module.exports = UserService;
