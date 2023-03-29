<template>
    <div class="my-20">
         <h1 class="text-4xl font-bold text-center text-gray-900">Find Your Dream Job</h1>


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
  
      <!-- <div class="w-full max-w-7xl mx-auto">
        <div class="grid gap-5 lg:grid-cols-2 px-5">
          <div v-for="job in jobs" :key="job.id" class="bg-white rounded-lg shadow-lg mb-8 p-6 hover:shadow-xl transition-shadow duration-300">
            <h2 class="text-2xl font-bold mb-2 text-purple-800"><a href="/JobListingById">{{ job.title }}</a></h2>
            <div class="text-gray-600 text-base mb-4 font-bold">{{ job.location }}</div>
            <p class="text-gray-800 mb-4">{{ job.description }}</p>
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-5">
              <div class="text-gray-600 text-base font-bold">Applicants: {{ job.applicant }}</div>
              <div class="text-gray-600 text-base font-bold">{{ formatDate(job.date) }}</div>
              <div class="text-gray-600 text-base font-bold">Status: <span class="bg-green-200 rounded-full py-1 px-2">{{ job.status }}</span></div> 
              <div class="text-2xl font-bold text-purple-800">Ksh{{ job.salary }}</div>
            </div>

            <div class="flex items-center py-5 justify-between">
             <div class="text-base bg-green-600 text-white px-2 py-1 rounded-md mt-3">{{ job.type }}</div>
             <a href="/JobListingById">  <button class="mt-4 bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors duration-300">Apply Now</button></a>
            </div>
          </div>
        </div>
      </div> -->

      <div class="w-full max-w-7xl mx-auto">
        <div class="grid gap-5 lg:grid-cols-2 px-5">
          <div v-for="job in jobs" :key="job.id" class="bg-white rounded-lg shadow-lg mb-8 p-6 hover:shadow-xl transition-shadow duration-300">
            <h2 class="text-2xl font-bold mb-2 text-purple-800"><a href="/JobListingById">{{ job.title }}</a></h2>
            <div class="text-gray-600 text-base mb-4 font-bold">{{ job.location }}</div>
            <p class="text-gray-800 mb-4">{{ job.description }}</p>
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-5">
              <div class="text-gray-600 text-base font-bold">Applicants: {{ job.applicant }}</div>
              <div class="text-gray-600 text-base font-bold">{{ formatDate(job.date) }}</div>
              <div class="text-gray-600 text-base font-bold">Status: <span class="bg-green-200 rounded-full py-1 px-2 ">{{ job.status }}</span></div> 
              <div class="text-2xl font-bold text-purple-800">Ksh{{ job.salary }}</div>
            </div>

            <div class="flex items-center py-5 justify-between">
             <div class="text-base bg-green-600 text-white px-2 py-1 rounded-md mt-3">{{ job.type }}</div>
             <a href="/JobListingById">  <button class="mt-4 bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors duration-300">More</button></a>
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
        jobs: [
          {
            id: 1,
            title: "Front-End Developer",
            location: "New York, NY",
            description:
              "We are seeking a talented Front-End Developer to join our team. The ideal candidate will have experience with React and be able to work in a fast-paced environment.",
            type: "Full-Time",
            salary: "80,000",
            date: "2023-03-21",
            applicant: "210",
            status: "on Hold"
          },
        ],
       
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
     
    },
  };
  </script>
  

<style scoped>

</style>
  