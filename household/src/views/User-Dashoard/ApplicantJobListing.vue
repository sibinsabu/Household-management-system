<template>
  <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 my-20 ">
    <div>
      <div class="border rounded-t-lg p-4 h-52">
         <h2 class="text-2xl font-bold mb-2 text-purple-800 uppercase text-center">job info</h2>
          <div class="grid grid-cols-2 gap-4">
              <div>
               <h4 class="text-gray-700 font-bold mb-1">Job title</h4>
                <p class="text-gray-600">{{JobsListing.jobTitle }}</p>
              </div>
              <div>
                <h4 class="text-gray-700 font-bold mb-1">Schedules</h4>
                <p class="text-gray-600">{{JobsListing.timeSchedule }}</p>
              </div>
              <div>
                <h4 class="text-gray-700 font-bold mb-1">Applicants</h4>
                <p class="text-gray-600"> {{JobsListing.ApplicantNumber}} </p>
              </div>
              <div>
               <h4 class="text-gray-700 font-bold mb-1">Salary</h4>
               <p class="text-gray-600">Ksh {{ formatSalary(JobsListing.salary) }}</p>
              </div>
          </div>
      </div>
      <div class="border bg-white rounded-b-lg p-4">
           <h2 class="text-2xl font-bold mb-2 text-purple-800 uppercase text-center">Applicant</h2>
           <div v-for="ApplicantJob in ApplicantJobs" :key="ApplicantJob.job_id" class="border-b last:border-b-0 mb-5 pt-3">
              <span class="text-lg font-bold uppercase">UserName: </span>
              <router-link :to="{ name: 'PublicProfile', params:{ id:ApplicantJob.user.id} }"><span class="text-lg font-medium text-purple-800 uppercase">{{ApplicantJob.user.username }}</span></router-link>
              <div class="mb-6 py-2">
                  <h3 class="text-lg font-bold text-gray-900">Job Description</h3>
                  <p class="text-gray-700 leading-relaxed">{{ApplicantJob.user.AboutMe }}</p>
              </div>
                
              <div>
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <h4 class="text-gray-700 font-bold mb-1">Date Applied</h4>
                     <p class=" text-lg text-gray-600 text-green-600">{{formatDate(ApplicantJob.date) }}</p>
                  </div>
                  <div>
                    <h4 class="text-gray-700 font-bold mb-1">JobTitle</h4>
                     <p class="text-gray-600">{{ ApplicantJob.user.jobTitle }}</p>
                  </div>
                  <div>
                   <h4 class="text-gray-700 font-bold mb-1">email</h4>
                    <p class="text-gray-600">{{ ApplicantJob.user.email  }}</p>
                  </div>
                  <div>
                   <h4 class="text-gray-700 font-bold mb-1">phoneNumber</h4>
                   <p class="text-gray-600"> {{ApplicantJob.user.phoneNumber}} </p>
                  </div>
                  <div>
                   <h4 class="text-gray-700 font-bold mb-1">Location</h4>
                   <p class="text-gray-600">{{ApplicantJob.user.location}}</p>
                  </div>
                    </div>
              </div>

              <div v-if="JobsListing.jobTitle === 'Posted'" class="mt-2 mb-10">
              <p class="font-medium font-serif">Accept Application</p>
              <button @click="AcceptApplication(ApplicantJob.user.id, JobsListing.job_id)" class="text-base bg-green-600 text-white px-2 py-1 rounded mr-3 capitalize">Accept</button>
              </div>
              <div else-if="JobsListing.jobTitle === 'Hired'" class="mt-2 mb-10">
                <p class="font-medium font-serif text-red-400">Application is Closed</p>
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
    ApplicantJobs:{},
    JobsListing:{},
    }
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  created() {
      apiCall(`/JobsApplication/${this.$route.params.id}`, 'GET')
      .then((res) => {
      this.ApplicantJobs = res.applicant;
      this.JobsListing = res.jobData;
      })
  },
  methods: {
    AcceptApplication(user_id,job_id ) {
    apiCall('/JobsApplication/AcceptApplicant', 'post', {
       user_id:user_id,
      })
      .then((res) => {     
          apiCall(`JobListings/${job_id}`, "PATCH", { status: 'Hired' })
          .then((res) => {
           console.log(res);
      })
      .catch((error) => {
       console.log(error);
      });
      }) .catch((error) => {
      });
    },

    formatSalary(salary) {
        const salaryNum = Number(salary);
        if (salaryNum >= 10000) {
          return salaryNum.toLocaleString('en-US', {minimumFractionDigits: 0, maximumFractionDigits: 0});
        } else {
          return salaryNum.toFixed(2);
        }
    },
 
   formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
    },
  },
}
</script>




