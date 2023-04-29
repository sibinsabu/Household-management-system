<template>
    <div class="bg-white py-4 px-4 shadow sm:rounded-lg sm:px-10 my-20 lg:w-6/12">
        <form @submit.prevent="Update" class="space-y-6">
  
                <div v-if="HandelError" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-2" role="alert">
                  <span class=" text-center">{{ HandelError }}</span>
                </div>
                <div v-if="HandelSuccess" class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-2" role="alert">
                  <span class=" text-center">{{ HandelSuccess }}</span>
                </div>
  
                <div class="mt-5">
                  <div class="relative rounded-md shadow-sm">
                    <input type="file" id="imageUpload" name="imageUpload" class="sr-only" @change="handleFileChange">
                       <div class="flex items-center justify-center px-6 py-3 bg-white text-blue-600 rounded-md hover:bg-blue-100 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600">
                         <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                          </svg>
                          <label for="imageUpload" class="">Upload an image</label>
                        </div>
                    </div>
                    <p v-if="formSubmitted && !image" class="text-red-500 text-xs italic">Please select an image.</p>
  
                    <div class="flex justify-center">
                     <img :src="imageUrl" v-if="image" class="w-60 h-60  mr-5 mt-3 full">
                    </div>
                </div>
          
                <div class="flex items-center py-5 justify-between">
                  <button type="button"  @click="$emit('close-modal')" class="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600">
                      Close
                   </button>
  
                  <button type="submit" class="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600">
                    Submit
                  </button>
              </div>
        </form>
      </div>
  </template>
  
  <script>
  import axios from "axios";
  import { SERVER_URL } from "../constant/index"
  
  export default {
  name: 'UpdateImage',

  data() {
  return {
    image: null,
    showModal: false,
    HandelSuccess: '',
    HandelError: '',
    formSubmitted: false
  };
  },
  methods: {
  handleFileChange(event) {
      this.image = event.target.files[0];
  },
  
  Update(){
      this.formSubmitted = true;
      if (!this.image) {
      return;
    }else{
      const formData = new FormData();
        formData.append('image', this.image);
  
      axios.patch(`${SERVER_URL}/authentication/updateUserProfile/image/${this.$route.params.id}`, formData, {
        headers: {
         'Content-Type': 'multipart/form-data'
          }
        })
        
        .then((res) => {
          if(res?.status ===200 ) {
             this.HandelSuccess = "Image Uploaded"
            }else{
              this.$emit('close-modal');
          }
       // Read the contents of the image file
            const reader = new FileReader();
            reader.readAsDataURL(this.image);
            reader.onload = () => {
              const imageData = reader.result; // Base64-encoded string
              let user = JSON.parse(localStorage.getItem("user"));
              user.image = imageData;
              localStorage.setItem("user", JSON.stringify(user));
            };
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
  
  computed: {
  imageUrl() {
        return this.image ? URL.createObjectURL(this.image) : "";
      },
  },
  }
  </script>