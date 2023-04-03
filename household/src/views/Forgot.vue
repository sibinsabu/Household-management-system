<template>
    <div class="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Forgot Password</h2>
      </div>
  
      <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div v-if="HandelError" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-2" role="alert">
            <span class="block sm:inline text-center">{{ HandelError }}</span>
        </div>
        <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border-solid border-2 border-blue-600">
          <form @submit.prevent="forgot" class="space-y-6">
                  <p class="mb-5 text-center text-sm text-gray-600 font-medium">Enter your email</p>
  
                  <div class="mt-5">
                    <label for="username" class="block text-sm font-medium text-gray-700 my-2">Email</label>
                    <div class="mt-1">
                    <input type="text" v-model="email" :class="{ 'border-red-500': formSubmitted && !email }" class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" placeholder="joe@gmail.com">
                    </div>
                  </div>

                  <div class="flex justify-center">
                    <button type="submit" class="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600">
                      Submit
                    </button>
                </div>
          </form>
        </div>
      </div>
    </div>
  </template>

<script>
import axios from "axios";

export default {
    data() {
    return {
      email: '',
      HandelError: '',
    }
  },
  methods: {
  forgot(){
      if (!this.email) {
        this.HandelError = "Include email address";
        return;
      }else if(!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.email)) {
        this.HandelError = "Invalid email address";
        return;
      }else{
        axios.post("http://localhost:5000/authentication/forgotPassword", {
        email: this.email,
       })
       .then(() => {
      this.email = "";
      })
      .catch(error => {
        if (error.response?.status === 404) {
          this.HandelError = "Email Does Not Exist"
          }
      });
    }
   },
}
}
</script>

<style>

</style>