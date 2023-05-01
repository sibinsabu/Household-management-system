<template>
  <div class="max-w-7xl mx-auto py-8 my-20">
      <div class="flex flex-col items-center justify-center">
        <div @click="openModal" class="w-12 h-12 rounded-lg bg-purple-600 flex items-center justify-center mb-2">
            <div class="fas fa-plus text-white text-2xl"><fa :icon="['fas', 'plus' ]" /></div>
        </div>
        <div class="text-purple-600 font-bold text-lg">Create Job Listing</div>
      </div>

      <div class="fixed inset-0 bg-zinc-100 bg-opacity-75 blur" v-if="showModal"></div>
      
      <div class="relative px-6 py-4" v-if="showModal">
        <div class="absolute inset-0  flex items-center justify-center lg:top-60 top-72">
            <JobForm @close-modal="closeModal" />
        </div>
      </div>

      <div class="w-full max-w-7xl mx-auto">
        <h2 class="text-3xl font-bold mb-10 px-5">My Job Listings Posts</h2>

        <div class="grid gap-5 lg:grid-cols-3">
          <div v-for="jobListing in jobListings" :key="jobListing.job_id" class="bg-white rounded-lg shadow-lg p-5 hover:shadow-xl transition-shadow duration-300">
            <h2 class="text-2xl font-bold text-purple-800 capitalize">{{ jobListing.jobTile }}</h2>
            <div class="text-gray-600 text-base mb-4 font-bold capitalize">{{ jobListing.location }}</div>
            <p class="text-gray-800 mb-4">{{ jobListing.description }}</p>

            <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-3">
              <div class="text-gray-600 text-base font-bold">Applicants: jh</div>
              <div class="text-gray-600 text-base font-bold">{{ formatDate(jobListing.date) }}</div>
              <div class="text-gray-600 text-base font-bold">Status: <span class="text-gray-600 bg-green-200 rounded-full px-2 inline-block">{{ jobListing.status }}</span></div> 
              <div class="text-2xl font-bold text-purple-800">Ksh {{ formatSalary(jobListing.salary) }}</div>
                <button v-if="jobListing.status === 'Posted'" @click="updateToHired(jobListing.job_id)" class="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded transition-colors duration-300">Update to Hired</button>
                <button v-if="jobListing.status === 'Hired'" @click="updateToClosed(jobListing.job_id)" class="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded transition-colors duration-300">Update to Closed</button>
            </div>

            <div class="flex items-center py-2 justify-between">
             <div class="text-base bg-green-600 text-white px-2 py-1 rounded-md">{{ jobListing.timeSchedule }}</div>
             <div @click="deleteJobListing(jobListing.job_id)" class="text-base bg-red-600 text-white px-2 py-1 rounded-md cursor-pointer">Delete</div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="deleteMessage" class="fixed bottom-0 right-0 bg-gray-600 rounded mb-10">
      <span class="block text-center text-white p-4">{{ deleteMessage }}</span>
    </div> 
    <div v-if="UpdateMessage" class="fixed bottom-0 right-0 bg-gray-600 rounded mb-10">
      <span class="block text-center text-white p-4">{{  UpdateMessage }}</span>
    </div> 
  </div>
</template>


<script>
import JobForm from '../../components/Create-job-form.Modal.vue'
import apiCall from '../../constant/Api'

export default {
    components: {
    JobForm,
  },

  data() {
    return {
      jobListings:{},
      UpdateMessage: "",
      deleteMessage: "",
      showModal: false,
    };
  },
  created() {
      apiCall('/JobListings/singleJob', 'GET')
      .then((res) => {
        this.jobListings = res.jobListing; 
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },
    updateToHired(job_id) {
      this.status = 'Hired'
      this.updateJobStatus(job_id)
    },
    updateToClosed(job_id) {
      this.status = 'Closed'
      this.updateJobStatus(job_id)
    },
    updateJobStatus(job_id) {
      apiCall(`JobListings/${job_id}`, "PATCH", { status: this.status })
        .then((res) => {
          this.UpdateMessage = "Job Status Updated successfully.";
        })
       .catch((err) => {
          console.log(err);
       });
    },
    deleteJobListing(id) {
     apiCall(`/JobListings/${id}`, 'DELETE')
      .then(() => {
        const index = this.jobListings.filter((jobListing) => jobListing.jog_id === id);
        this.jobListings.splice(index, 1);
        this.deleteMessage = "jobListing deleted successfully.";
      })
      .catch((error) => {
        console.log(error);
      });
    },

    openModal() {
      this.showModal = true;
    },

    closeModal() {
      this.showModal = false;
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


<style>

</style>