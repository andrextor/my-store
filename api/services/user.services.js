const boom = require('@hapi/boom');
//const pool = require('../libs/mysql.pool.js')
const { models } = require('../libs/sequelize.js');
const bcrypt = require('bcrypt');

class UserService {
  constructor() { }

  async create(data) {

    const hash = await bcrypt.hash(data.password, 2);

    const newUser = await models.User.create({
      ...data,
      password: hash
    });
    console.log(newUser.toJSON());
    const { email, role } = newUser.toJSON();

    return {
      email,
      role
    }
  }

  async find() {
    const response = await models.User.findAll({
      include: ['customer'],
      attributes: ['id', 'email', 'role', 'created_at'],
    });
    // const query = 'SELECT * FROM tasks';
    //const [results] = await pool.execute(query);
    //const [data] = await sequelize.query(query);

    return response;
  }
  async findOne(id) {
    const user = await models.User.findByPk(id);

    if (!user) {
      throw boom.notFound('user not found');
    }
    return user;
  }

  async update(id, changes) {
    const user = this.findOne(id);
    const response = await user.update(changes);

    return response
  }


  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();

    return { status: '204' }
  }
}

module.exports = UserService;
