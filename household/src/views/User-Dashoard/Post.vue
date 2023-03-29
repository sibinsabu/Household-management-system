<template>
  <div class="max-w-7xl mx-auto py-8 my-20">
    <div class="flex flex-col items-center justify-center">
        <div @click="openModal" class="w-12 h-12 rounded-lg bg-purple-600 flex items-center justify-center mb-2">
            <div class="fas fa-plus text-white text-2xl"><fa :icon="['fas', 'plus' ]" /></div>
        </div>
        <div class="text-purple-600 font-bold text-lg">Create Job Listing</div>
      </div>

      <div class="fixed inset-0 bg-zinc-100 bg-opacity-75 blur" v-if="showModal"></div>
      
      <div class="relative px-6 py-4" v-if="showModal">
        <div class="absolute inset-0  flex items-center justify-center lg:top-20 top-20">
            <PostForm @close-modal="closeModal"/>
        </div>
      </div>

    <div class="max-w-md mx-auto bg-white rounded-md shadow-md overflow-hidden mt-5">
        <div class="border-b mb-5">
            <div class="flex items-center p-4">
                <div class="w-12 h-12 mr-4">
                <img src="../../assets/images/photo-1633332755192-727a05c4013d.jpg" alt="Product Image" class="w-full h-full rounded-full object-cover">
                </div>
                <div class="">
                    <h2 class="text-base font-bold mb-1">John</h2>
                    <p class="text-gray-600 text-sm mb-2">1 day ago</p>
                </div>
            </div>
            <div class="px-4 pb-4">
                <p class="text-gray-800 text-sm leading-6">Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus explicabo expedita enim incidunt ipsam voluptatibus tempora null</p>
                <img src="../../assets/images/Babysitting-Mobile.jpg" class="h-48 w-full object-cover mt-4" />
            </div>  
        </div>  
        <div class="border-b  mb-5">
            <div class="flex items-center p-4">
                <div class="w-12 h-12 mr-4">
                <img src="../../assets/images/photo-1633332755192-727a05c4013d.jpg" alt="Product Image" class="w-full h-full rounded-full object-cover">
                </div>
                <div class="">
                    <h2 class="text-base font-bold mb-1">John</h2>
                    <p class="text-gray-600 text-sm mb-2">1 day ago</p>
                </div>
            </div>
            <div class="px-4 pb-4">
                <p class="text-gray-800 text-sm leading-6">Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus explicabo expedita enim incidunt ipsam voluptatibus tempora null</p>
                <img src="../../assets/images/Babysitting-Mobile.jpg" class="h-48 w-full object-cover mt-4" />
            </div> 
        </div> 
        <div class="border-b  mb-5">
            <div class="flex items-center p-4">
                <div class="w-12 h-12 mr-4">
                <img src="../../assets/images/photo-1633332755192-727a05c4013d.jpg" alt="Product Image" class="w-full h-full rounded-full object-cover">
                </div>
                <div class="">
                    <h2 class="text-base font-bold mb-1">John</h2>
                    <p class="text-gray-600 text-sm mb-2">1 day ago</p>
                </div>
            </div>
            <div class="px-4 pb-4">
                <p class="text-gray-800 text-sm leading-6">Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus explicabo expedita enim incidunt ipsam voluptatibus tempora null</p>
                <img src="../../assets/images/Babysitting-Mobile.jpg" class="h-48 w-full object-cover mt-4" />
            </div> 
        </div> 
    </div>


  </div>
</template>

<script>
import  PostForm from '../../components/Create-Post-form.vue'
export default {
    components: {
    PostForm,
  },

  data(){
    return {
        showModal: false,
    };
  },
 methods: {
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
  },
}
</script>

<style>

</style>