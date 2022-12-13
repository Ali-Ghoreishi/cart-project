import { Sequelize } from "sequelize";


const connectionOption = {
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'cart_db',
  port: 3306
};


const sequelize = new Sequelize({
  database: connectionOption.database,
  username: connectionOption.user,
  password: connectionOption.password,
  host: connectionOption.host,
  port: connectionOption.port,
  dialect: "mysql",
  logging: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});


const connect_db = async () => {
  try {
    await sequelize.authenticate();
    console.log(`Connected to database: ${connectionOption.database}`);
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export { sequelize, connect_db }

