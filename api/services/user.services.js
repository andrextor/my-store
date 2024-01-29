const boom = require('@hapi/boom');
//const pool = require('../libs/mysql.pool.js')
const { models } = require('../libs/sequelize.js');

class UserService {
  constructor() { }

  async create(data) {
    const newUser = await models.User.create(data);

    return newUser.toJSON();
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
    return user.toJSON();
  }

  async update(id, changes) {
    const user = this.findOne(id);
    const response = await user.update(changes);

    return response
  }


  async delete(id) {
    const user = this.findOne(id);
    await user.destroy();

    return { status: '204' }
  }
}

module.exports = UserService;
