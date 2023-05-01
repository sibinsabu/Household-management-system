const express = require("express")
const cors = require("cors")
const morgan = require("morgan");
const bodyParser = require('body-parser');
const database = require("./config/database");
const app = express();
const UserRoutes = require('./routes/User.Route')
const BlogRoutes = require('./routes/Blog.Route')
const ReviewRoutes = require('./routes/Reviews.Route')
const JobListingRoutes = require('./routes/Job.Listing.Route')
const ApplicantRoutes = require('./routes/Applicant.Job.Route')

try{
    database.authenticate();
    console.log('the application is now as connection to the database');
}catch(err){
    console.log('database connection failed');
}


app.use(express.json({limit: '50mb'}));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(cors());
app.use(morgan("dev"));
app.use('/authentication', UserRoutes)
app.use('/Blogs', BlogRoutes)
app.use('/Reviews', ReviewRoutes)
// Homeowner API
app.use('/JobListings', JobListingRoutes)
// Applicant API
app.use('/Jobs', ApplicantRoutes)


app.listen(5000, () => console.log("this server is running at port 5000"));