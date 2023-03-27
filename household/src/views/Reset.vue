<template>
    <div class="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Forgot Password</h2>
      </div>
  
      <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border-solid border-2 border-blue-600">
          <form @submit.prevent="reset" class="space-y-6">
                  <p class="mb-5 text-center text-sm text-gray-600 font-medium">Enter your email</p>
  
                  <div class="mt-5">
                    <label for="password" class="block text-sm font-medium text-gray-700 my-2">Password</label>
                    <div class="mt-1">
                    <input type="password" v-model="password" :class="{ 'border-red-500': formSubmitted && !password }" class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent">
                    </div>
                  </div>

                  <div class="mt-5">
                    <label for="confirmPassword" class="block text-sm font-medium text-gray-700 my-2">Confirm Password</label>
                    <div class="mt-1">
                    <input type="password" v-model="confirmPassword" :class="{ 'border-red-500': formSubmitted && !confirmPassword }" class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent">
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
export default {
    data() {
    return {
        password: '',
        confirmPassword:'',
      formSubmitted: false
    }
  },
  methods: {
    reset(){
        this.formSubmitted = true;
        if (!this.password || !this.confirmPassword ) {
        return;
      }
       console.log(this.password, this.confirmPassword );
   },
}
}
</script>

<style>

</style>