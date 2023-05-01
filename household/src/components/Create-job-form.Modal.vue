<template>
    <div class="bg-white py-4 px-4 shadow sm:rounded-lg sm:px-10 my-20">
        <div v-if="HandelError" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-2" role="alert">
          <span class=" text-center">{{ HandelError }}</span>
        </div>
        <div v-if="HandelSuccess" class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-2" role="alert">
          <span class=" text-center">{{ HandelSuccess }}</span>
        </div>
        <form @submit.prevent="jobs" class="space-y-6 w-80">
                  <p class="mb-5 text-center text-sm text-gray-600 font-medium">Create a job listing</p>
  
                  <div class="mt-5 ">
                      <label for="jobTile" class="block text-sm font-medium text-gray-700">Job Title</label>                  
                      <input type="text" v-model="jobTile" class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none">
                      <p v-if="formSubmitted && !jobTile " :class="{ 'text-red-500 text-xs italic': formSubmitted && !jobTile }" >Include job Tile.</p>                 
                  </div>
  
                  <div class="mt-5">
                      <label for="description" class="block text-sm font-medium text-gray-700">Job Description</label>                    
                      <textarea type="text" v-model="description" class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none"></textarea>
                      <p v-if="formSubmitted && !description" :class="{ 'text-red-500 text-xs italic': formSubmitted && !description }" >Include Job Description.</p>                     
                  </div>
                  <div class="mt-5">
                      <label for="location" class="block text-sm font-medium text-gray-700">Location</label>              
                      <input type="text" v-model="location" class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none">
                      <p v-if="formSubmitted && !location" :class="{ 'text-red-500 text-xs italic': formSubmitted && !location }" >Include Location.</p>  
                  </div>

                  <div class="mt-5">
                        <label for="time Schedule" class="block text-sm font-medium text-gray-700">time Schedule</label>
                        <select v-model="timeSchedule" class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none">
                            <option value="Choose">Choose</option>
                            <option value="Full-time">Full-time</option>
                            <option value="Part-time">Part-time</option>
                        </select>
                        <p v-if="formSubmitted && !timeSchedule" :class="{'text-red-500 text-xs italic': formSubmitted && !timeSchedule }" >Include time Scheduled.</p>  
                  </div>
                   
                  <div class="flex flex-wrap space-x-4">
                    <div class="mt-5">
                        <label for="salary" class="block text-sm font-medium text-gray-700">Salary</label>
                        <input type="text" v-model="salary" class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none">
                        <p v-if="formSubmitted && !salary" :class="{ 'text-red-500 text-xs italic': formSubmitted && !salary }" >Include salary.</p>                     
                    </div>
                  </div>
               
                  <div class="flex items-center py-5 justify-between">
                    <button type="button"  @click="$emit('close-modal')" class="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600">
                      Close
                   </button>

                    <button type="submit" class="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                      Submit
                    </button>
                </div>
        </form>
     </div>
  </template>
  
  <script>
  import apiCall from "../constant/Api"

  export default {
    name: 'JobForm',
    data() {
    return {
      jobTile:'',
      description:'',
      location:'',
      timeSchedule:'',
      salary:'',
      HandelSuccess: '',
      HandelError: '',
      showModal: false,
      formSubmitted: false
    };
  },
  methods: {
    jobs(){
        this.formSubmitted = true;
      if (!this.jobTile || !this.description || !this.location || !this.timeSchedule || !this.salary) {
        return;
      }else{
    
      apiCall('/JobListings', 'post', {
        jobTile: this.jobTile,
        description: this.description,
        location: this.location,
        timeSchedule: this.timeSchedule,
        salary: this.salary,
      })
      .then((res) => {
        console.log(res);
        if(res?.status ===200 ) {
           this.HandelSuccess = "Job Listing Uploaded"
          }else{
            this.$emit('close-modal');
        }
      })
      .catch(error => {
        console.log(error);
      if (error.response?.status === 400) {
        this.HandelError = "All Fields Are Required"
      }
    });
    }
   },
  },
}
  </script>
  
  <style>

  </style>