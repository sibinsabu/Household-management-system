<template>
    <div class="max-w-7xl mx-auto my-20 py-6 sm:px-6 lg:px-8">
      <div class="max-w-3xl mx-auto">
        <h1 class="text-2xl font-bold mb-4">Update Profile</h1>
        <form @submit.prevent="handleUpdateUser">
            <div v-if="HandelError" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-2" role="alert">
                <span class=" text-center">{{ HandelError }}</span>
            </div>
            <div v-if="HandelSuccess" class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-2" role="alert">
                <span class=" text-center">{{ HandelSuccess }}</span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 mx-3">
            <label class="block font-medium text-gray-700 mb-2" for="name"> Image </label>
            <p align="center">
              <img class="w-20 h-20 rounded-full" :src="userProfile.image" alt="Banner Image">
            </p>

            <label class="block font-medium text-gray-700 mb-2" for="name"> Name </label>
            <input class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text"  v-model="userProfile.username" />

             <label v-if="user.accountType === 'Applicant'" class="block font-medium text-gray-700 mb-2" for="name"> AccountType </label>
            <input class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text"  v-model="userProfile.accountType" />

             <label class="block font-medium text-gray-700 mb-2" for="name"> jobTitle </label>
            <input class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text"  v-model="userProfile.jobTitle" />

            <label class="block font-medium text-gray-700 mb-2" for="name"> email </label>
            <input class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="email"  v-model="userProfile.email" />

             <label class="block font-medium text-gray-700 mb-2" for="name"> Phone Number </label>
            <input class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text"  v-model="userProfile.phoneNumber" />

             <label class="block font-medium text-gray-700 mb-2" for="name"> Location </label>
            <input class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text"  v-model="userProfile.location" />

            <label class="block font-medium text-gray-700 mb-2" for="name"> About Me </label>
            <textarea class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text"  v-model="userProfile.AboutMe" ></textarea>
          </div>

          <button type="submit" class="inline-flex items-center px-4 py-2 border border-transparent rounded-md font-semibold text-white bg-blue-600 hover:bg-blue-700">Update Profile  </button>
        </form>
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
        HandelError: '',
        HandelSuccess: '',
        formSubmitted: false
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
    methods: {
        handleUpdateUser() {
            axios.patch(`${SERVER_URL}/authentication/updateUserProfile/${this.$route.params.id}`,  this.userProfile)
            .then((res) => {
                if (res?.status ===200 ) {
                  this.HandelSuccess = "profile updated successfully"
            }
            })
            .catch(error => {
            if (error.response?.status === 400) {
             this.HandelError = "All Fields Are Required"
            }
          })
        }
    },
  }
  </script>
    
    