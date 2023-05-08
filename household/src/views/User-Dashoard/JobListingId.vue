<template>
    <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 my-20 mt-20">
      <div v-if="saveJobMessage" class="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative mb-2" role="alert">
           <span class="block sm:inline text-center">{{ saveJobMessage }}</span>
      </div>

      <div v-if="user && user.accountType === 'Applicant'" class="px-2">
          <div class="border rounded-t-lg p-4 h-40">
            <h2 class="text-2xl font-bold mb-2 text-purple-800 uppercase text-center">homeowner</h2>
              <div class="flex items-center mb-4">
                <router-link :to="{ name: 'PublicProfile', params:{ id:userId} }"><img class="w-10 h-10 rounded-full mr-2" :src="image" alt="Applicant Image"></router-link>
                <div>
                  <p class="text-gray-900 font-bold"><a href="/public-profile">{{ username }}</a></p>
                  <p class="text-gray-600">{{ email }}</p>
                </div>
              </div>
          </div>
          <div class="border bg-white rounded-b-lg p-4">
            <h2 class="text-2xl font-bold mb-2 text-purple-800 uppercase text-center">job info</h2>
            <span class="text-2xl font-bold mb-2 uppercase">Job title: </span>
            <span class="text-2xl font-bold mb-2 text-purple-800 uppercase">{{jobTitle }}</span>
            <div class="mb-6 py-5">
              <h3 class="text-lg font-bold text-gray-900 mb-2">Job Description</h3>
              <p class="text-gray-700 leading-relaxed">{{description }}</p>
            </div>
          
            <div class="mb-6">
              <h3 class="text-2xl font-bold text-gray-900 mb-2">Job Details</h3>
              <div class="grid grid-cols-2 gap-4">
                  <div>
                    <h4 class="text-gray-700 font-bold mb-1">Location</h4>
                    <p class="text-gray-600">{{location  }}</p>
                  </div>
                  <div>
                    <h4 class="text-gray-700 font-bold mb-1">Schedules</h4>
                    <p class="text-gray-600">{{timeSchedule }}</p>
                  </div>
                  <div>
                    <h4 class="text-gray-700 font-bold mb-1">Applicants</h4>
                    <p class="text-gray-600"> {{ApplicantNumber}} </p>
                  </div>
                  <div>
                    <h4 class="text-gray-700 font-bold mb-1">Status</h4>
                    <p class="text-gray-600 bg-green-200 rounded-full px-2 inline-block">{{status }}</p>
                  </div>
                  <div>
                    <h4 class="text-gray-700 font-bold mb-1">Salary</h4>
                    <p class="text-gray-600">Ksh {{ formatSalary(this.salary) }}</p>
                  </div>
                  <div>
                    <button v-if="isJobSaved" @click="removeJob(job_id)" class="mt-4 bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors duration-300">Remove</button>
                    <button v-else @click="saveJob(job_id)" class="mt-4 bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors duration-300">Save Job</button>
                 </div>
              </div>
            </div>
          </div>
      </div>


       <div v-else-if="user && user.accountType === 'Homeowner'" class="bg-white border rounded-lg px-4 mx-2 py-5 sm:p-6 mt-10">
            <span class="text-2xl font-bold mb-2 uppercase">Job title: </span>
            <span class="text-2xl font-bold mb-2 text-purple-800 uppercase">{{jobTitle }}</span>

            <div class="mb-6 py-5">
              <h3 class="text-lg font-bold text-gray-900 mb-2">Job Description</h3>
              <p class="text-gray-700 leading-relaxed">{{description }}</p>
            </div>

            <div class="mb-6">
              <h3 class="text-2xl font-bold text-gray-900 mb-2">Job Details</h3>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <h4 class="text-gray-700 font-bold mb-1">Location</h4>
                  <p class="text-gray-600 capitalize">{{location }}</p>
                </div>
                <div>
                  <h4 class="text-gray-700 font-bold mb-1">Schedules</h4>
                  <p class="text-gray-600">{{timeSchedule }}</p>
                </div>
                <div>
                  <h4 class="text-gray-700 font-bold mb-1">Applicants</h4>
                  <p class="text-gray-600"> {{ApplicantNumber}} </p>
                </div>
                <div>
                  <h4 class="text-gray-700 font-bold mb-1">Salary</h4>
                  <p class="text-gray-600">Ksh {{ formatSalary(this.salary) }}</p>
                </div>
                <div class="flex flex-wrap justify-between">
                  <div class="w-full md:w-auto md:mr-4">
                    <h4 class="text-gray-700 font-bold mb-1">Status</h4>
                    <p class="text-gray-600 bg-green-200 rounded-full px-2 inline-block">{{status }}</p>
                  </div>
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
      jobListings:{},
      HandelSuccess: '',
      job_id: "",
      description: "",
      status: "",
      salary: "",
      timeSchedule: "",
      location: "",
      jobTitle: "",
      ApplicantNumber: "",
      userId: "",
      username: "",
      email: "",
      image: "",
      }
    },
    computed: {
      user() {
        return this.$store.state.user;
      },
      saveJobMessage() {
      return this.$store.state.saveJob
     },
     isJobSaved() {
      return this.$store.state.savedJobs && this.$store.state.savedJobs.find(j => j.id === this.job_id);
    }, 
    },
    created() {
      apiCall(`/JobListings/${this.$route.params.id}`, 'GET')
      .then((res) => {
        this.job_id = res.jobListings[0].job_id;
        this.description = res.jobListings[0].description;
        this.status = res.jobListings[0].status;
        this.salary = res.jobListings[0].salary;
        this.timeSchedule = res.jobListings[0].timeSchedule;
        this.location = res.jobListings[0].location;
        this.jobTitle = res.jobListings[0].jobTitle;
        this.ApplicantNumber = res.jobListings[0].ApplicantNumber;
        this.userId = res.jobListings[0].user_id;
        this.username = res.jobListings[0].user.username;
        this.email = res.jobListings[0].user.email;
        this.image = res.jobListings[0].user.image;
      })
    },
    methods: {
      saveJob() {
        const job = {
          id: this.job_id,
          description: this.description,
          status: this.status,
          salary: this.salary,
          timeSchedule: this.timeSchedule,
          location: this.location,
          jobTitle: this.jobTitle,
          ApplicantNumber: this.ApplicantNumber,
        };
        this.$store.dispatch('SAVE_JOB', job);
      },
      removeJob(jobId) {
  
  
      // Update the savedJobs state in the Vuex store
      this.$store.commit('REMOVE_JOB', jobId);
 
   
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
}
</script>


