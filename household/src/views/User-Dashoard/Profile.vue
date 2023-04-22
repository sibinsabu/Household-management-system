<template>
<div>
  <div class="max-w-7xl mx-auto my-20 px-4 md:px-0">

    <div class="flex flex-col md:flex-row  justify-center items-center lg:justify-start lg:items-start">
      <div class="md:w-20 lg:mt-20 lg:w-60 md:mr-4 md:mb-0 h-full w-40">
        <div class="relative">
           <img class="w-60 h-60 rounded-full mr-5" :src="userProfile.image" alt="Banner Image">
          <p title="edit"><router-link :to="{ name: 'UpdateProfile', params:{ id:user.id} }" ><fa :icon="['fas', 'edit' ]" class="ml-2 cursor-pointer text-gray-400 hover:text-gray-500" /></router-link></p> 
        </div>
      </div>

      <div class="md:ml-10 mt-10">
        <div class="mb-2">
          <div class="flex items-center">
           <h1 class="uppercase text-lg leading-6  text-gray-900 mb-2">Account Name:  <span class="font-bold text-purple-800 uppercase text-2xl font-bol">{{ userProfile.username }}</span></h1>
           <p title="edit"><router-link :to="{ name: 'UpdateProfile', params:{ id:user.id} }" ><fa :icon="['fas', 'edit' ]" class="ml-2 cursor-pointer text-gray-400 hover:text-gray-500" /></router-link></p> 
          </div>
          <p class="text-lg leading-6  text-gray-900 mb-2">phone Number: <span class="uppercase text-lg font-bold mb-1">{{ userProfile.phoneNumber }}</span></p>
          <p class="text-lg leading-6  text-gray-900 mb-2">email: <span class="uppercase text-lg font-bold mb-1">{{ userProfile.email }}</span></p>
          <p class="text-lg leading-6  text-gray-900 mb-2">Location: <span class="uppercase text-lg font-bold mb-1">{{ userProfile.location }}</span></p>            
          <p v-if="user.accountType === 'Applicant'" class="text-lg leading-6  text-gray-900 mb-2">Job Title: <span class="uppercase text-lg font-bold mb-1">{{ userProfile.jobTitle }}</span></p>
          <p class="text-lg leading-6  text-gray-900 mb-2">Account Type: <span class="uppercase text-lg font-bold mb-1">{{ userProfile.accountType }}</span></p>
        </div>

        <div class="mb-5 mt-10">
          <div class="flex items-center">
            <h3 class="text-lg leading-6 font-bold text-gray-900">About Me</h3>
            <p title="edit"><router-link :to="{ name: 'UpdateProfile', params:{ id:user.id} }" ><fa :icon="['fas', 'edit' ]" class="ml-2 cursor-pointer text-gray-400 hover:text-gray-500" /></router-link></p>  
          </div>
          <p class="mt-1 max-w-2xl text-lg text-gray-500">{{ userProfile.AboutMe }}</p>
        </div>


        <div class="flex flex-col md:flex-row items-center mt-5">
          <!-- <a href="#" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md mb-2 md:mb-0 md:mr-2">Send Message</a> -->
        </div>
      </div>
    </div>

  </div>

  <div class="max-w-7xl mx-auto my-20 px-4 md:px-0">
  <h2 class="text-3xl font-bold mb-10">My Blog Posts</h2>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    <div class="flex bg-white rounded-lg shadow-lg">
      <img class="h-48 w-full object-cover m-auto" src="../../assets/images/photo-1633332755192-727a05c4013d.jpg" alt="Blog Post 1">
      <div class="p-6">
        <p class="text-gray-600 text-sm mb-2">May 1, 2023</p>
        <h3 class="text-lg font-bold mb-2">My First Blog Post</h3>
        <p class="text-gray-700">Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, ea fugit</p>
      </div>
     </div>

     <div class="flex bg-white rounded-lg shadow-lg">
      <img class="h-48 w-full object-cover m-auto" src="../../assets/images/photo-1633332755192-727a05c4013d.jpg" alt="Blog Post 1">
      <div class="p-6">
        <p class="text-gray-600 text-sm mb-2">May 1, 2023</p>
        <h3 class="text-lg font-bold mb-2">My First Blog Post</h3>
        <p class="text-gray-700">Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, ea fugit</p>
      </div>
     </div>
  </div>
  </div>
</div>
</template>

<script>
import axios from "axios";
import { SERVER_URL } from "../../constant/index";

export default {
  data() {
    return {
      userProfile: {},
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  created() {
    axios.get(`${SERVER_URL}/authentication/${this.$route.params.id}`)
      .then((res) => {
        this.userProfile = res.data.user;
      })
      .catch((error) => {
    
      });
  },
}
</script>

