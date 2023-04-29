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

      <div class="w-full max-w-7xl mx-auto mt-10">
        <h2 class="text-3xl font-bold mb-10 px-5">My Job Listings Posts</h2>

        <div class="grid gap-5 lg:grid-cols-2 px-5">
          <div v-for="job in jobs" :key="job.id" class="bg-white rounded-lg shadow-lg mb-8 p-6 hover:shadow-xl transition-shadow duration-300">
            <h2 class="text-2xl font-bold mb-2 text-purple-800"><a href="/JobListingById">{{ job.title }}</a></h2>
            <div class="text-gray-600 text-base mb-4 font-bold">{{ job.location }}</div>
            <p class="text-gray-800 mb-4">{{ job.description }}</p>
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-5">
              <div class="text-gray-600 text-base font-bold">Applicants: {{ job.applicant }}</div>
              <div class="text-gray-600 text-base font-bold">{{ formatDate(job.date) }}</div>
              <div class="text-gray-600 text-base font-bold">Status: {{ job.status }}</div> 
              <div class="text-2xl font-bold text-purple-800">Ksh{{ job.price }}</div>
            </div>

            <div class="flex items-center py-5 justify-between">
             <div class="text-base bg-green-600 text-white px-2 py-1 rounded-md">{{ job.type }}</div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>


<script>
import JobForm from '../../components/Create-job-form.Modal.vue'

export default {
    components: {
    JobForm,
  },

  data() {
    return {
      jobs: [
        {
          id: 1,
          title: "Front-End Developer",
          location: "New York, NY",
          description:
            "We are seeking a talented Front-End Developer to join our team. The ideal candidate will have experience with React and be able to work in a fast-paced environment.",
          type: "Full-Time",
          price: "80,000",
          date: "2023-03-21",
          applicant: "210",
          status: "on Hold"
        },
      ],
      showModal: false,
    };
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
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
  },
};
</script>


<style>

</style>