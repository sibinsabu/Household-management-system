const {DataTypes} = require('sequelize')
const database = require('../config/database')
const Users = require('../models/User.Model')

const Ratings = database.define("ratings",{
    rating_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Users,
            key: 'id',
          },
    },
    rated_user_id:{
        type: DataTypes.INTEGER,
    },
    rating:{
        type: DataTypes.INTEGER,
    },
},
{
    freezeTableName: true,
    timestamps: true,
}
);

Ratings.belongsTo(Users, { foreignKey: 'user_id' });

database.sync()
  .then(() => {
    console.log("table Synced successfully!");
  })
  .catch((error) => {
    console.log("Unable to Synced table", error);
});

module.exports = Ratings;