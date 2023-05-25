<template>
  <div class="my-20">
    <h1 class="text-4xl font-bold text-center text-gray-900">Your Saved Jobs</h1>
     
      <div v-if="HandelSuccess" class="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative mb-2" role="alert">
           <span class="block sm:inline text-center">{{ HandelSuccess }}</span>
      </div>
      <div v-if="HandelError" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-2" role="alert">
           <span class="block sm:inline text-center">{{ HandelError }}</span>
      </div>

    <div  class="w-full max-w-7xl mx-auto my-10">
      <div class="grid gap-5 lg:grid-cols-2 px-5">
        <div v-for="job in savedJobs" :key="job.id" class="bg-white rounded-lg shadow-lg mb-8 p-6 hover:shadow-xl transition-shadow duration-300">
          <h2 class="text-2xl font-bold mb-2 text-purple-800 uppercase"><a :href="`/JobListingById/${job.id}`">{{ job.jobTitle }}</a></h2>
          <div class="text-gray-600 text-base mb-4 font-bold capitalize">{{ job.location }}</div>
          <p class="text-gray-800 mb-4">{{ job.description }}</p>
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-5">
            <div class="text-gray-600 text-base font-bold"> Applicants: {{ job.ApplicantNumber }} </div>
            <div class="text-gray-600 text-base font-bold">{{ job.timeSchedule }}</div>
            <div class="text-gray-600 text-base font-bold"> Status: <span class="text-gray-600 bg-green-200 rounded-full px-2 inline-block">{{ job.status }}</span></div>
            <div class="text-2xl font-bold text-purple-800">Ksh {{ formatSalary(job.salary) }}</div>
          </div>

          <div class="flex items-center py-5">
            <button @click="ApplyForJob(job.id)" class="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md mr-4">Apply</button>
            <button @click="removeJob(job)" class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md">Remove</button>
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
      savedJobs: [],
      Applicant: '1',
      HandelSuccess: '',
      HandelError: '',
    }
  },
  created() {
    const savedJobs = JSON.parse(localStorage.getItem('savedJobs'));
    if (savedJobs) {
      this.savedJobs = savedJobs;
    }
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
    removeJob(id) {
      this.$store.commit("REMOVE_JOB", id);
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString();
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
