<template>
    <div class="my-20">
       <div>
        <h1 v-if="user && user.accountType === 'Applicant'" class="text-4xl font-bold text-center text-gray-900">Find Your Dream Job</h1>
         <h1 v-else-if="user && user.accountType === 'Homeowner'" class="text-4xl font-bold text-center text-gray-900">Job Listing</h1>
       </div>

         <div v-if="HandelSuccess" class="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative mb-2" role="alert">
            <span class="block sm:inline text-center">{{ HandelSuccess }}</span>
        </div>
        <div v-if="HandelError" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-2" role="alert">
            <span class="block sm:inline text-center">{{ HandelError }}</span>
        </div>

      <div class="w-full max-w-7xl mx-auto py-10">
       <div class="grid gap-5 lg:grid-cols-2 px-5">
        <div class="relative">
          <input type="text" id="search" name="search" placeholder="Search for jobs" class="py-2 px-10 pr-20 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent w-full">
          <div class="absolute inset-y-0 right-0 flex items-center pr-3">
            <svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="none" stroke="currentColor">
              <path d="M8 12a4 4 0 100-8 4 4 0 000 8zM19 19l-4.35-4.35"></path>
            </svg>
          </div>
        </div>

        <div class="flex justify-center items-center">
          <label for="filter" class="mr-2 text-gray-600">Filter job:</label>
          <select class="appearance-none block px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent">
            <option value="">All Jobs</option>
            <option value="maid">Maid</option>
            <option value="nanny">Nanny</option>
            <option value="elder-care">Elder Care</option>
            <option value="meal-preparation">Meal Preparation</option>
          </select>
        </div>
       </div>
      </div>
  
      <div v-if="user && user.accountType === 'Applicant'" class="w-full max-w-7xl mx-auto">
        <div class="grid gap-5 lg:grid-cols-2 px-5">
          <div  v-for="jobListing in jobListings" :key="jobListing.job_id" class="bg-white rounded-lg shadow-lg mb-8 p-6 hover:shadow-xl transition-shadow duration-300">
            <h2 class="text-2xl font-bold mb-2 text-purple-800 uppercase"><router-link :to="{ name: 'JobListing', params:{ id:jobListing.job_id} }">{{ jobListing.jobTile }}</router-link></h2>
            <div class="text-gray-600 text-base mb-4 font-bold capitalize">{{ jobListing.location }}</div>
            <p class="text-gray-800 mb-4">{{ jobListing.description }}</p>
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-5">
              <div class="text-gray-600 text-base font-bold">Applicants: {{jobListing.ApplicantNumber}}</div>
              <div class="text-gray-600 text-base font-bold">{{ formatDate(jobListing.date) }}</div>
              <div class="text-gray-600 text-base font-bold">Status: <span class="bg-green-200 rounded-full py-1 px-2">{{ jobListing.status }}</span></div> 
              <div class="text-2xl font-bold text-purple-800">Ksh {{ formatSalary(jobListing.salary) }}</div>
            </div>

            <div class="flex items-center py-5 justify-between">
              <div class="text-base bg-green-600 text-white px-2 py-1 rounded-md mt-3 capitalize">{{ jobListing.timeSchedule}}</div>
              <p v-if="jobListing.status === 'Closed'" class="mt-4 text-sm text-red-400 px-4 py-2 font-medium">Application Closed</p>
              <button v-else @click="ApplyForJob(jobListing.job_id)" class="mt-4 bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors duration-300">Apply Now</button>
              
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="user && user.accountType === 'Homeowner'" class="w-full max-w-7xl mx-auto">
        <div class="grid gap-5 lg:grid-cols-2 px-5">
          <div v-for="jobListing in jobListings" :key="jobListing.job_id" class="bg-white rounded-lg shadow-lg mb-8 p-6 hover:shadow-xl transition-shadow duration-300">
            <h2 class="text-2xl font-bold mb-2 text-purple-800 uppercase"><router-link :to="{ name: 'JobListing', params:{ id:jobListing.job_id} }">{{ jobListing.jobTile }}</router-link></h2>
            <div class="text-gray-600 text-base mb-4 font-bold capitalize">{{ jobListing.location }}</div>
            <p class="text-gray-800 mb-4">{{ jobListing.description }}</p>
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-5">
              <div class="text-gray-600 text-base font-bold"><router-link :to="{ name: 'ApplicantJobListing', params:{ id:jobListing.job_id} }">Applicants: {{jobListing.ApplicantNumber}}</router-link></div>
              <div class="text-gray-600 text-base font-bold">{{ formatDate(jobListing.date) }}</div>
              <div class="text-gray-600 text-base font-bold">Status: <span class="bg-green-200 rounded-full py-1 px-2 ">{{ jobListing.status }}</span></div> 
              <div class="text-2xl font-bold text-purple-800">Ksh {{ formatSalary(jobListing.salary) }}</div>
            </div>

            <div class="flex items-center py-5 justify-between">
             <div class="text-base bg-green-600 text-white px-2 py-1 rounded-md mt-3 capitalize">{{ jobListing.timeSchedule}}</div>
             <router-link :to="{ name: 'JobListing', params:{ id:jobListing.job_id} }">  <button class="mt-4 bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors duration-300">More</button></router-link>
            </div>
          </div>
        </div>
      </div>

    </div>
</template>
  
  
<script>
  import apiCall from '../../constant/Api'

  export default {
    data() {
      return {
        jobListings: {},
        Applicant: '1',
        HandelSuccess: '',
        HandelError: '',
      };
    },
    created() {
      apiCall('/JobListings', 'GET')
      .then((res) => {
        this.jobListings = res.jobListing;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
    ApplyForJob(job_id) {
    apiCall('/JobsApplication', 'post', {
        ApplicantNumber: this.Applicant,
        job_id: job_id,
      })
      .then((res) => {
           this.HandelSuccess = "You have Applied For The Job"
      }) .catch((error) => {
        if (error.response?.status === 400) {
          this.HandelError = "You have already applied for this job"
          }
      });
    },

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
    },
 
    formatSalary(salary) {
      const salaryNum = Number(salary);
      if (salaryNum >= 10000) {
        return salaryNum.toLocaleString('en-US', {minimumFractionDigits: 0, maximumFractionDigits: 0});
      } else {
        return salaryNum.toFixed(2);
      }
    }
 },
  };
</script>
  

  