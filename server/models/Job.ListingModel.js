const {DataTypes} = require('sequelize')
const database = require('../config/database')

const JobListing = database.define("jobListing",{
    job_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    location:{
        type: DataTypes.STRING,
    },
    jobType:{
        type: DataTypes.STRING,
    },
    description:{
        type: DataTypes.STRING,
    },
    schedule:{
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
},
{
    freezeTableName: true,
    timestamps: true,
}
);

db.sync()
  .then(() => {
    console.log("table Synced successfully!");
  })
  .catch((error) => {
    console.log("Unable to Synced table", error);
});

module.exports = JobListing;