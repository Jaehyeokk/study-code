const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./db.sqlite",
});

const user = sequelize.define("User", {
  name: {
    type: DataTypes.STRING,
  },
});

module.exports = {
  Sequelize,
  sequelize,
  user,
};
