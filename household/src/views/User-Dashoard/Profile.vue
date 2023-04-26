<template>
<div>
  <div class="max-w-7xl mx-auto my-20 px-4 md:px-0">
    <div class="flex flex-col md:flex-row   lg:justify-start lg:items-start">
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
      </div>
    </div>
  </div>

  <div class="max-w-7xl mx-auto my-20 px-4 md:px-0">
  <h2 class="text-3xl font-bold mb-10">My Blog Posts</h2>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    <div class="flex bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300" v-for="blog in blogs" :key="blog.blog_id" style="position: relative;">
      <img class="h-48 w-48 object-cover" :src="blog.image" alt="Blog Post Image">
      <div class="p-6">
        <p class="text-gray-600 text-sm mb-2 font-bold">{{ formatDistance(new Date(blog.createdAt), Date.now(), { includeSeconds: false, locale: enGB, approximate: false }) }}</p>
        <p class="text-gray-700">{{ blog.description}}</p>
      </div>
      <div title="delete" style="position: absolute; top: 0; right: 0;">
        <fa :icon="['fas', 'trash-alt']" @click="confirmDelete(blog.blog_id)" class="mx-2 text-red-400 cursor-pointer" />
      </div>
    </div>
  </div>

    <div v-if="deleteMessage" class="fixed bottom-0 right-0 bg-gray-600 rounded mb-10">
    <span class="block text-center text-black p-4">{{ deleteMessage }}</span>
  </div> 

  </div>
</div>
</template>

<script>
import { formatDistance } from 'date-fns';
import axios from "axios";
import { SERVER_URL } from "../../constant/index";
import apiCall from '../../constant/Api'

export default {
  data() {
    return {
      userProfile: {},
      blogs: [],
      deleteMessage: "",
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

      apiCall('/Blogs/SingleUser', 'GET')
      .then((res) => {
        this.blogs = res.blogs; 
      })
      .catch((error) => {
        console.log(error);
      });

      this.formatDistance = formatDistance.bind(this);
  },
  methods: {
  deleteBlog(id) {
    apiCall(`/Blogs/${id}`, 'DELETE')
      .then(() => {
        const index = this.blogs.findIndex((blog) => blog.blog_id === id);
        this.blogs.splice(index, 1);
        this.deleteMessage = "Blog post deleted successfully.";
      })
      .catch((error) => {
        console.log(error);
      });
  },
},

}
</script>


