<template>
  <div class="my-20">
    <h1 class="text-4xl font-bold text-center text-gray-900">Your Saved Jobs</h1>

    <div class="w-full max-w-7xl mx-auto my-10">
       <div class="grid gap-5 lg:grid-cols-2 px-5">
        <div v-for="job in savedJobs" :key="job.id"  class="bg-white rounded-lg shadow-lg mb-8 p-6 hover:shadow-xl transition-shadow duration-300" >
          <h2 class="text-2xl font-bold mb-2 text-purple-800" ><a href="/JobListingById">{{ job.title }}</a></h2>
          <div class="text-gray-600 text-base mb-4 font-bold">{{ job.location }}</div>
          <p class="text-gray-800 mb-4">{{ job.description }}</p>
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-5">
            <div class="text-gray-600 text-base font-bold"> Applicants: {{ job.applicant }} </div>
            <div class="text-gray-600 text-base font-bold">{{ formatDate(job.date) }}</div>
            <div class="text-gray-600 text-base font-bold"> Status: {{ job.status }}</div>
            <div class="text-2xl font-bold text-purple-800">Ksh {{ job.price }}</div>
          </div>

          <div class="flex items-center py-5">
            <button class="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md mr-4"><a href="/JobListingById">Apply</a></button>
            <button class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md">Remove</button>
          </div>
        </div>
       </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      savedJobs: [
        {
          id: 1,
          title: "Housekeeper Needed",
          location: "Los Angeles, CA",
          description: "Looking for a reliable housekeeper for a family of four",
          applicant: 3,
          date: "2022-03-16",
          status: "Active",
          price: 20.5,
          type: "maid",
        },
        {
          id: 2,
          title: "Elder Care Needed",
          location: "New York, NY",
          description: "Need an experienced caregiver for an elderly parent",
          applicant: 2,
          date: "2022-03-15",
          status: "Active",
          price: 25,
          type: "elder-care",
        },
        {
          id: 3,
          title: "Part-Time Nanny",
          location: "Chicago, IL",
          description: "Seeking a part-time nanny for two children",
          applicant: 5,
          date: "2022-03-10",
          status: "Inactive",
          price: 15.75,
          type: "nanny",
        },
      ],
      filterType: "",
      searchText: "",
    };
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString();
    },
  },

};
</script>

<style scoped>
/* Add your custom styles here */
</style>