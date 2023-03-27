<template>
  <div class="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Create an account
      </h2>
    </div>

   <!-- status bar -->
    <div class="flex justify-center items-center space-x-2 mt-4">
        <div v-for="i in 3" 
            :key="i" 
            :class="['h-3 w-3 rounded-full', step >= i ? 'bg-blue-600' : 'bg-gray-300']">
        </div>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-2">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border-solid border-2 border-blue-600">
        <form @submit.prevent="signup" class="space-y-6">
            <div v-show="step === 1">
                 <p class="mb-5 text-center text-sm text-gray-600 font-medium">Enter your signUp credential</p>

                 <div class="relative rounded-md shadow-sm">
                    <input type="file" id="imageUpload" name="imageUpload" class="sr-only" @change="handleImageChange">
                     <div class="flex items-center justify-center px-6 py-3 bg-white text-blue-600 rounded-md hover:bg-blue-100 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600">
                         <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                          </svg>
                          <label for="imageUpload" class="">Upload an image</label>
                      </div>

                  </div>

                <div class="flex justify-center">
                <img :src="imageUrl" v-if="imageUrl" class="max-h-60 mt-3 rounded-full ">
                </div>

                <div class="mt-5">
                    <label for="username" class="block text-sm font-medium text-gray-700 my-2">Username</label>
                    <div class="mt-1">
                    <input type="text" v-model="userName" class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent">
                    </div>
                </div>

                <div class="mt-5">
                    <label for="password" class="block text-sm font-medium text-gray-700 my-2">Password</label>
                    <div class="mt-1">
                    <input type="password" v-model="password" class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent">
                    </div>
                </div>

                <div class="mt-5">
                    <label for="username" class="block text-sm font-medium text-gray-700 my-2">Email</label>
                    <div class="mt-1">
                    <input type="text" v-model="email" class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent">
                    </div>
                </div>

                <div class="mt-5">
                    <label for="text"  class="block text-sm font-medium text-gray-700 my-2">Phone Number</label>
                    <div class="mt-1">
                    <input type="number"  v-model="phoneNumber" class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent">
                    </div>
                </div>
            
                <p class="mt-2 text-center text-sm text-gray-600 my-2">
                 <a href="/Login" class="font-medium text-blue-600 hover:text-blue-500">login to your account</a>
                </p>
                <div class="flex justify-end">
                <button type="button" :disabled="!stepOne"  class="py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600" @click="step = 2">
                    Next
                </button>
                </div>
            </div>
            
            <div class="space-y-6" v-show="step === 2">
                <p class="mt-2 text-center text-sm text-gray-600 font-medium">credential</p>
                <div>
                    <label for="username" class="block text-sm font-medium text-gray-700 my-2">Bio</label>
                    <div class="mt-1">
                    <textarea type="text" v-model="bio" class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"></textarea>
                    </div>
                </div>

                <div>
                    <label for="text" class="block text-sm font-medium text-gray-700 my-2">Location/Address</label>
                    <div class="mt-1">
                    <input type="text" v-model="location" class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent">
                    </div>
                </div>

                <div class="flex justify-between">
                    <button type="button" class="py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600" @click="step = 1">
                    Back
                    </button>
                    <button type="button" :disabled="!stepTwo" class="py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600" @click="step = 3">
                    Next
                    </button>
                </div>
            </div>

            <div class="space-y-6" v-show="step === 3">
                <p class="mt-2 text-center text-sm text-gray-600 font-medium"> Account Description</p>
                <div>
                    <label for="Account Type" class="block text-sm font-medium text-gray-700 my-2">Account Type</label>
                    <div class="mt-1">
                    <select v-model="accountType" class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus: ring-blue-600 focus:border-transparent">
                        <option value="">Choose </option>
                        <option value="Homeowner">Homeowner</option>
                        <option value="Applicant">Applicant</option>
                    </select>
                    </div>
                </div>

                <div v-if="shouldShowJobTitle">
                    <label for="Job title" class="block text-sm font-medium text-gray-700 my-2">Job title</label>
                    <div class="mt-1">
                    <select v-model="jobTitle" class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus: ring-blue-600 focus:border-transparent">
                        <option value="">Select a job</option>
                        <option value="Maid">Maid</option>
                        <option value="Baby siting">Baby siting</option>
                        <option value="Elder Care">Elder Care</option>
                        <option value="Meal Preparation">Meal Preparation</option>
                    </select>
                    </div>
                </div>
        
                <div class="flex justify-between">
                    <button type="button" class="py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600" @click="step = 2">
                       Back
                    </button>
                    <button type="submit"   :disabled="accountType === '' || jobTitle === ''" class="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600">
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
export default {
  data() {
    return {
      step: 1,
      imageUrl: null,
      userName: '',
      password: '',
      email: '',
      phoneNumber: '',
      bio: '',
      location: '',
      accountType: '',
      jobTitle: '',
    }
  },

  methods: {
    handleImageChange(event) {
      const file = event.target.files[0];
      if (!file) {
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageUrl = reader.result;
      };
    },

    signup() {
  console.log(this.userName, this.password, this.email, this.phoneNumber, this.bio, this.location, this.accountType);

  if (this.accountType !== 'Homeowner') {
    console.log(this.jobTitle);
    // include code to submit jobTitle here
  }
}
  },

  computed: {
  stepOne() {
    return this.userName && this.password && this.email && this.phoneNumber && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email);
  },
  
  stepTwo() {
    return this.bio && this.location ;
  },
  shouldShowJobTitle() {
        return this.accountType !== 'Homeowner';
    },
},
}
</script>

<style>

</style>