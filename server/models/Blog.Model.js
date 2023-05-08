const {DataTypes} = require('sequelize')
const database = require('../config/database')
const Users = require('../models/User.Model')

const Blogs = database.define("blogs",{
    blog_id: {
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
    image:{
        type: DataTypes.STRING,
    },
    description:{
        type: DataTypes.STRING,
    }, 
    likes:{
        type: DataTypes.INTEGER,
    },
},
{
    freezeTableName: true,
    timestamps: true,
}
);

Blogs.belongsTo(Users, { foreignKey: 'user_id' });

database.sync()
  .then(() => {
    console.log("table Synced successfully!");
  })
  .catch((error) => {
    console.log("Unable to Synced table", error);
});

module.exports = Blogs;