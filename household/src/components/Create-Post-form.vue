<template>
    <div class="bg-white py-4 px-4 shadow sm:rounded-lg sm:px-10 my-20 lg:w-6/12">
        <form @submit.prevent="post" class="space-y-6">
                <p class="mb-5 text-center text-sm text-gray-600 font-medium">Create a job listing</p>

                <div class="mt-5">
                  <div class="relative rounded-md shadow-sm">
                    <input type="file" class="sr-only">
                       <div class="flex items-center justify-center px-6 py-3 bg-white text-blue-600 rounded-md hover:bg-blue-100 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600">
                         <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                          </svg>
                          <label for="imageUpload" class="">Upload an image</label>
                        </div>

                    </div>
                </div>

                <div class="mt-5">
                    <label for="description" class="block text-sm font-medium text-gray-700">Description</label>                  
                    <textarea type="text" v-model="description" class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none"></textarea>
                    <p v-if="formSubmitted && !description " :class="{ 'text-red-500 text-xs italic': formSubmitted && !description }" >Include description.</p>                 
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
export default {
  name: 'PostForm',
  data() {
  return {
    description:'',
    showModal: false,
    formSubmitted: false
  };
},
methods: {
  post(){
      this.formSubmitted = true;
      if (!this.description) {
      return;
    }
     console.log(this.description);
     this.$emit('close-modal');
 },
},
}
</script>

<style>

</style>