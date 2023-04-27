<template>
  <div class="max-w-7xl mx-auto py-8 my-20">
    <div class="flex flex-col items-center justify-center">
        <div @click="openModal" class="w-12 h-12 rounded-lg bg-purple-600 flex items-center justify-center mb-2">
            <div class="fas fa-plus text-white text-2xl"><fa :icon="['fas', 'plus' ]" /></div>
        </div>
        <div class="text-purple-600 font-bold text-lg">Create Job Listing</div>
      </div>

      <div class="fixed inset-0 bg-zinc-100 bg-opacity-75 blur" v-if="showModal"></div>
      
      <div class="relative px-6 py-40" v-if="showModal">
        <div class="absolute inset-0  flex items-center justify-center lg:top-20 top-20">
            <PostForm @close-modal="closeModal"/>
        </div>
      </div>

    <div class="max-w-md mx-auto bg-white rounded-md shadow-md overflow-hidden mt-5">
        <div class="border-b mb-5" v-for="blog in blogs" :key="blog.blog_id">
            <div class="flex items-center p-4">
                <div class="w-12 h-12 mr-4">
                <img :src="blog.user.image" alt="Product Image" class="w-full h-full rounded-full object-cover">
                </div>
                <div class="">
                    <h2 class="text-base font-bold mb-1">{{blog.user.username}}</h2>
                    <p class="text-gray-600 text-sm mb-2">{{ formatDistance(new Date(blog.createdAt), Date.now(), { includeSeconds: false, approximate: false }) }}</p>
                </div>
            </div>
            <div class="px-4 pb-4">
                <p class="text-gray-800 text-sm leading-6">{{ blog.description }}</p>
                <img :src="blog.image" class="h-96 w-full object-cover mt-4" />
            </div> 
            <div class="flex items-center justify-between px-4 py-2">
               <button type="submit" @click="postLikes(blog.blog_id)" class="bg-gray-200 rounded-full p-2 mr-2">
                 <fa :icon="['fas', 'heart' ]" class="text-blue-400"/>
               </button>
               <span class="text-gray-800">{{ blog.likes }} likes</span>

            </div> 
        </div>  
    </div>


  </div>
</template>

<script>
import { formatDistance } from 'date-fns';
import PostForm from '../../components/Create-Post-form.vue'
import apiCall from '../../constant/Api'

export default {
  components: {
    PostForm,
  },

  data() {
    return {
      blogs: [],
      showModal: false,
    };
  },

  created() {
    apiCall('/Blogs', 'GET')
      .then((res) => {
        this.blogs = res.blogs; 
      })
      .catch((error) => {
        console.log(error);
      });

      this.formatDistance = formatDistance.bind(this);
  },

  methods: {
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    
    postLikes(blogId) {
      apiCall(`/Blogs/${blogId}`, 'PUT')
    .catch((error) => {
      console.log(error);
    });
  }
 },
};
</script>


