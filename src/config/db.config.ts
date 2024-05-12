import { Sequelize  } from 'sequelize';

const db = new Sequelize('test-haciendola', 'root', 'root', {
    dialect: 'mysql',
    host: 'localhost',
    logging: false
})


export default db;