<template>
  <div class="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Create an account</h2>
    </div>

   <!-- status bar -->
    <div class="flex justify-center items-center space-x-2 mt-4">
        <div v-for="i in 2" 
            :key="i" 
            :class="['h-3 w-3 rounded-full', step >= i ? 'bg-blue-600' : 'bg-gray-300']">
        </div>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-2">
      <div v-if="HandelError" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-2" role="alert">
        <span class=" text-center">{{ HandelError }}</span>
      </div>
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border-solid border-2 border-blue-600">
        <form @submit.prevent="signup" class="space-y-6">
            <div v-show="step === 1">
                 <p class="mb-5 text-center text-sm text-gray-600 font-medium">Enter your signUp credential</p>

                 <div class=" relative border-2 border-gray-300 border-dashed rounded-lg p-6" id="dropzone">
                    <input  @change="handleFileChange" type="file" class="absolute inset-0 w-full h-full opacity-0 z-50" />
                    <div class="text-center">
                        <img class="mx-auto h-12 w-12" src="https://www.svgrepo.com/show/357902/image-upload.svg" alt="">

                        <h3 class="mt-2 text-sm font-medium text-gray-900">
                            <label for="file-upload" class="relative cursor-pointer">
                                <span>Drag and drop</span>
                                <span class="text-indigo-600"> or browse</span>
                                <span>to upload</span>
                                <input id="file-upload" name="file-upload" type="file" class="sr-only">
                            </label>
                        </h3>
                        <p class="mt-1 text-xs text-gray-500">  PNG, JPG, GIF up to 10MB </p>

                        <img :src="imageUrl" v-if="image" class="w-60 h-60  mr-5 mt-3 ">
                    </div>
                    <img src="" class="mt-4 mx-auto max-h-40 hidden" id="preview">

                    <p v-if="formSubmitted && !image" class="text-red-500 text-xs italic">Please select an image.</p>

                  </div>

                <div class="mt-5">
                    <label for="username" class="block text-sm font-medium text-gray-700 my-2">Username</label>
                    <div class="mt-1">
                    <input type="text" v-model="username" class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent">
                    </div>
                    <p v-if="formSubmitted && !username" class="text-red-500 text-xs italic">Please enter a username.</p>
                </div>

                <div class="mt-5">
                    <label for="password" class="block text-sm font-medium text-gray-700 my-2">Password</label>
                    <div class="mt-1">
                    <input type="password" v-model="password" class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent">
                    </div>
                    <p v-if="formSubmitted && !password" class="text-red-500 text-xs italic">Please enter a password.</p>
                </div>

                <div class="mt-5">
                    <label for="username" class="block text-sm font-medium text-gray-700 my-2">Email</label>
                    <div class="mt-1">
                    <input type="text" v-model="email" class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent">
                    </div>
                    <p v-if="formSubmitted && !email" class="text-red-500 text-xs italic">Please enter an email.</p>
                </div>

                <div class="mt-5">
                    <label for="text"  class="block text-sm font-medium text-gray-700 my-2">Phone Number</label>
                    <div class="mt-1">
                    <input type="number"  v-model="phoneNumber" class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent">
                    </div>
                    <p v-if="formSubmitted && !phoneNumber" class="text-red-500 text-xs italic">Please enter a phone number.</p>
                </div>
            
                <p class="mt-2 text-center text-sm text-gray-600 my-2">
                 <a href="/Login" class="font-medium text-blue-600 hover:text-blue-500">login to your account</a>
                </p>
                <div class="flex justify-end">
                <button type="button" class="py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600" @click="formSubmitted = true; if (stepOne) { step = 2 }">
                    Next
                </button>
                </div>
            </div>
            
            <div class="space-y-6" v-show="step === 2">
                <p class="mt-2 text-center text-sm text-gray-600 font-medium">credential</p>
                <div>
                    <label for="username" class="block text-sm font-medium text-gray-700 my-2">AboutMe</label>
                    <div class="mt-1">
                    <textarea type="text" v-model="AboutMe" class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"></textarea>
                    </div>
                    <p v-if="formSubmitted && !AboutMe" class="text-red-500 text-xs italic">Please enter a AboutMe.</p>
                </div>

                <div>
                    <label for="text" class="block text-sm font-medium text-gray-700 my-2">Location/Address</label>
                    <div class="mt-1">
                    <input type="text" v-model="location" class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent">
                    </div>
                    <p v-if="formSubmitted && !location" class="text-red-500 text-xs italic">Please enter a location.</p>
                </div>

                <div class="flex justify-between">
                    <button type="button" class="py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600" @click="step = 1">
                    Back
                    </button>
                    <button type="submit" class="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600">
                      Create account
                    </button>
                </div>
            </div>
        </form>
      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios";
import { SERVER_URL } from "../constant/index";

export default {
  data() {
    return {
      step: 1,
      image: null,
      accountType: 'Homeowner',
      username: '',
      password: '',
      email: '',
      phoneNumber: '',
      AboutMe: '',
      location: '',
      HandelError: '',
      formSubmitted: false
    }
  },

  methods: {
    handleFileChange(event) {
      this.image = event.target.files[0];
    },

    signup() {
      this.formSubmitted = true;
      if (!this.AboutMe || !this.location) {
        return;
      } else{
        const formData = new FormData();
        formData.append('accountType', this.accountType)
        formData.append('image', this.image);
        formData.append('username', this.username)
        formData.append('password', this.password)
        formData.append('email', this.email)
        formData.append('phoneNumber', this.phoneNumber)
        formData.append('AboutMe', this.AboutMe)
        formData.append('location', this.location)
        axios.post(`${SERVER_URL}/authentication/signup`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(() => {
        this.$router.push('/Login');
      })
    .catch(error => {
      if (error.response?.status === 401) {
        this.HandelError = "Email is already taken"
      }
    });
   }
  }
  },

  computed: {
  stepOne() {
    if (!this.username || !this.password || !this.phoneNumber || !this.image) {
      return false;
    }
    if (!this.email || !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.email)) {
      this.HandelError =  'Please enter a valid email address';
      return false;
    }
    this.HandelError = '';
    return true;
  },
  imageUrl() {
      return this.image ? URL.createObjectURL(this.image) : "";
    },
  }
}
</script>

<style>

</style>