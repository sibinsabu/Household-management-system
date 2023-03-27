<template>
    <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 my-20 mt-40">

      
      <!-- <div class="grid grid-cols-1 gap-4 lg:grid-cols-3 px-2">
        <div class="col-span-2 border bg-white rounded-lg p-4 mt-5">
          <div class="flex items-center justify-between mb-4">
            <div>
              <span class="text-2xl font-bold mb-2 uppercase">Job title: </span>
              <span class="text-2xl font-bold mb-2 text-purple-800 uppercase">{{ jobTitle }}</span>
            </div>
          </div>

          <div class="mb-6 py-5">
            <h3 class="text-lg font-bold text-gray-900 mb-2">Job Description</h3>
            <p class="text-gray-700 leading-relaxed">{{ jobDescription }}</p>
          </div>
         
          <div class="mb-6">
            <h3 class="text-2xl font-bold text-gray-900 mb-2">Job Details</h3>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <h4 class="text-gray-700 font-bold mb-1">Location</h4>
                <p class="text-gray-600">{{ location }}</p>
              </div>
              <div>
                <h4 class="text-gray-700 font-bold mb-1">Schedules</h4>
                <p class="text-gray-600">{{ schedules }}</p>
              </div>
              <div>
                <h4 class="text-gray-700 font-bold mb-1">Applicants</h4>
                <p class="text-gray-600">{{ applicants }}</p>
              </div>
              <div>
                <h4 class="text-gray-700 font-bold mb-1">Status</h4>
                <p class="text-gray-600 bg-green-200 rounded-full w-20 px-2">{{ status }}</p>
              </div>
              <div>
                <h4 class="text-gray-700 font-bold mb-1">Salary</h4>
                <p class="text-gray-600">Ksh {{ salary }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="border rounded-lg p-4 h-40 lg:mt-40 ml-5">
           <h2 class="text-2xl font-bold mb-2 text-purple-800 uppercase text-center">homeowner</h2>
            <div class="flex items-center mb-4">
               <a href="/public-profile"><img class="w-10 h-10 rounded-full mr-2" src="../assets/images/photo-1633332755192-727a05c4013d.jpg" alt="Applicant Image"></a>
              <div>
                <p class="text-gray-900 font-bold"><a href="/public-profile">john</a></p>
                <p class="text-gray-600">email@gmail.com </p>
              </div>
            </div>
        </div>
      </div> -->


       <div class="bg-white border rounded-lg px-4 mx-2 py-5 sm:p-6 mt-10">
          <div class="flex items-center justify-between mb-4">
            <div>
              <span class="text-2xl font-bold mb-2 uppercase">Job title: </span>
              <span class="text-2xl font-bold mb-2 text-purple-800 uppercase">{{ jobTitle }}</span>
            </div>
          </div>

          <div class="mb-6 py-5">
            <h3 class="text-lg font-bold text-gray-900 mb-2">Job Description</h3>
            <p class="text-gray-700 leading-relaxed">{{ jobDescription }}</p>
          </div>

          <div class="mb-6">
            <h3 class="text-2xl font-bold text-gray-900 mb-2">Job Details</h3>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <h4 class="text-gray-700 font-bold mb-1">Location</h4>
                <p class="text-gray-600">{{ location }}</p>
              </div>
              <div>
                <h4 class="text-gray-700 font-bold mb-1">Schedules</h4>
                <p class="text-gray-600">{{ schedules }}</p>
              </div>
              <div>
                <h4 class="text-gray-700 font-bold mb-1">Applicants</h4>
                <p class="text-gray-600">{{ applicants }}</p>
              </div>
              <div>
                <h4 class="text-gray-700 font-bold mb-1">Salary</h4>
                <p class="text-gray-600">Ksh {{ salary }}</p>
              </div>
              <div class="flex flex-wrap justify-between">
                <div class="w-full md:w-auto md:mr-4">
                  <h4 class="text-gray-700 font-bold mb-1">Status</h4>
                  <p class="text-gray-600 bg-green-200 rounded-full px-2 inline-block">{{ status }}</p>
                </div>
                <div><button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded md:mt-0 mt-4 transition-colors duration-300 lg:mt-5">Update Status</button></div>
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
        jobTitle: 'Nanny',
        homeownerImgAlt: 'Homeowner Profile Picture',
        homeownerName: 'john ali',
        jobDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        location: 'City, State',
        salary: '2000',
        compensation: '$hhhh',
        applicants: '544',
        schedules: "20hrs a day",
        salary: "20000",
        status: "on Hold"
      }
    }
}
    </script>


<style scoped>

</style>
