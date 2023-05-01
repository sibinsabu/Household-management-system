const {DataTypes} = require('sequelize')
const database = require('../config/database')
const Users = require('../models/User.Model')

const JobListing = database.define("jobListing",{
    job_id: {
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
    location:{
        type: DataTypes.STRING,
    },
    jobTile:{
        type: DataTypes.STRING,
    },
    description:{
        type: DataTypes.STRING,
    },
    timeSchedule:{
        type: DataTypes.STRING,
    },
    salary:{
        type: DataTypes.INTEGER,
    },
    date:{
        type: DataTypes.DATE,
    }, 
    status:{
        type: DataTypes.STRING,
    },
    ApplicantNumber:{
        type: DataTypes.STRING,
    },
},
{
    freezeTableName: true,
    timestamps: true,
}
);

JobListing.belongsTo(Users, { foreignKey: 'user_id' });

database.sync()
  .then(() => {
    console.log("table Synced successfully!");
  })
  .catch((error) => {
    console.log("Unable to Synced table", error);
});

module.exports = JobListing;