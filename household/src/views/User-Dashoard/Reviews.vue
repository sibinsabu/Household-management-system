<template>
  <div class="max-w-7xl mx-auto my-20 px-4 sm:px-6 lg:px-8">

        <form  @submit.prevent="review" class="max-w-lg mx-auto">
           <h2 class="text-center font-medium text-lg"> leave your review</h2>
            <div class="mb-4">
                <label for="description" class="block mb-2 font-semibold text-gray-700">Description:</label>
                <textarea type="text" v-model="reviews" class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none"></textarea>  
                <p v-if="formSubmitted && !reviews" :class="{ 'text-red-500 text-xs italic': formSubmitted && !reviews}" >Please Enter your review.</p>            
            </div>
            <div class="flex justify-end">
                <button type="submit" class="px-4 py-2 text-white bg-indigo-500 rounded-lg hover:bg-indigo-600 focus:bg-indigo-600">Submit</button>
            </div>
        </form>
  
        <div class="flex mb-5">
            <div class="w-10 h-10">
                <img src="../../assets/images/photo-1633332755192-727a05c4013d.jpg" alt="Product Image" class="w-10 h-10 rounded-full">
            </div>
            <div class="w-full md:w-2/3 px-4 md:px-6">
                <h4 class="text-sm font-semibold">Date</h4>
                <p><strong class="text-sm">Name:</strong> John Doe</p>
                <p><strong class="text-sm">Description:</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.</p>
            </div>
        </div>

        <div class="flex">
            <div class="w-10 h-10">
                <img src="../../assets/images/photo-1633332755192-727a05c4013d.jpg" alt="Product Image" class="w-10 h-10 rounded-full">
            </div>
            <div class="w-full md:w-2/3 px-4 md:px-6">
                <h4 class="text-sm font-semibold">Date</h4>
                <p><strong class="text-sm">Name:</strong> John Doe</p>
                <p><strong class="text-sm">Description:</strong> Lorem ipsum dolor sit amet, a massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat.</p>
            </div>
        </div>
    
  </div>  
</template>

<script>
export default {
    data() {
    return {
      reviews: '',
      formSubmitted: false
    }
  },
  
methods: {
review(){
   this.formSubmitted = true;
    if (!this.reviews) {
        return;
    }
       console.log(this.reviews);
   },
}
}
</script>

<style>

</style>