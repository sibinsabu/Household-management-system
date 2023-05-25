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

            <div class="fixed inset-0 bg-zinc-100 bg-opacity-75 blur" v-if="showModal"></div>
              <div class="relative px-6 py-40" v-if="showModal">
                <div class="absolute inset-0  flex items-center justify-center lg:top-20 top-20">
                    <UpdateImage @close-modal="closeModal"/>
                </div>
              </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 mx-3">
              <label class="block font-medium text-gray-700 mb-2" for="name"> Image </label>
              <div class="flex items-center justify-center">
                <img class="w-20 h-20 rounded-full" :src="userProfile.image" alt="Banner Image"> 
                <p title="edit"><fa :icon="['fas', 'edit' ]" @click="openModal" class="ml-2 cursor-pointer text-gray-400 hover:text-gray-500" /></p> 
              </div>
      
             

              <label class="block font-medium text-gray-700 mb-2" for="name"> Name </label>
              <input class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text"  v-model="userProfile.username" />

              <label class="block font-medium text-gray-700 mb-2" for="name"> AccountType </label>
              <input class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text"  v-model="userProfile.accountType" />

              <label v-if="user.accountType === 'Applicant'" class="block font-medium text-gray-700 mb-2" for="name"> jobTitle </label>
              <input v-if="user.accountType === 'Applicant'" class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text"  v-model="userProfile.jobTitle" />

              <label class="block font-medium text-gray-700 mb-2" for="name"> email </label>
              <input class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="email"  v-model="userProfile.email" />

              <label class="block font-medium text-gray-700 mb-2" for="name"> Phone Number </label>
              <input class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text"  v-model="userProfile.phoneNumber" />

              <label class="block font-medium text-gray-700 mb-2" for="name"> Location </label>
              <input class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text"  v-model="userProfile.location" />

              <label class="block font-medium text-gray-700 mb-2" for="name"> About Me </label>
              <textarea class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text"  v-model="userProfile.AboutMe" ></textarea>
          </div>

          <button type="submit" class="inline-flex items-center ml-3 px-4 py-2 border border-transparent rounded-md font-semibold text-white bg-blue-600 hover:bg-blue-700">Update Profile  </button>
        </form>
      </div>
    </div>
  </template>
  
    
  <script>
  import axios from "axios";
  import { SERVER_URL } from "../../constant/index";
  import UpdateImage from '../../components/UpdateImage.Modal.vue'
  
  export default {
    components: {
      UpdateImage,
    },
    data() {
      return {
        userProfile: {},
        HandelError: '',
        HandelSuccess: '',
        showModal: false,
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
        openModal() {
        this.showModal = true;
        },
        closeModal() {
          this.showModal = false;
        },

        handleFileChange(event) {
          this.userProfile.image = event.target.files[0];
        },
      
        handleUpdateUser() {
          const formData = new FormData();
          formData.append('accountType', this.userProfile.accountType)
          formData.append('username', this.userProfile.username)
          formData.append('jobTitle', this.userProfile.jobTitle)
          formData.append('email', this.userProfile.email)
          formData.append('phoneNumber', this.userProfile.phoneNumber)
          formData.append('AboutMe', this.userProfile.AboutMe)
          formData.append('location', this.userProfile.location)

            axios.patch(`${SERVER_URL}/authentication/updateUserProfile/${this.$route.params.id}`, formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            })
            .then((res) => {
              if (res?.status ===200 ) {
                  this.HandelSuccess = "profile updated successfully"
              }
              
                let user = JSON.parse(localStorage.getItem("user"));
                user.name = this.userProfile.username;
                user.email = this.userProfile.email;
                user.accountType = this.userProfile.accountType;
                 localStorage.setItem("user", JSON.stringify(user));
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
    
    