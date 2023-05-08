<template>
  <div class="max-w-7xl mx-auto my-20 px-4 md:px-0">
    <div class="flex flex-col md:flex-row lg:justify-start lg:items-start 2xl:items-center 2xl:justify-center">
      <div class="flex items-center justify-center">
        <img class="w-60 h-60 rounded-full mr-5" :src="userProfile.image" alt="Banner Image">
      </div>

      <div class="md:ml-10 mt-10">
        <div class="mb-2">
          <h1 class="uppercase text-lg leading-6  text-gray-900 mb-2">Account Name: <span class="font-bold text-purple-800 uppercase text-2xl font-bol">{{ userProfile.username }}</span></h1>
          <p class="text-lg leading-6  text-gray-900 mb-2">Location: <span class="uppercase text-lg font-bold mb-1">{{ userProfile.location }}</span></p>            
          <p v-if="user.accountType === 'Applicant'" class="text-lg leading-6  text-gray-900 mb-2">Job Title: <span class="uppercase text-lg font-bold mb-1">{{ userProfile.jobTitle }}</span></p>
          <p class="text-lg leading-6  text-gray-900 mb-2">Account Type: <span class="uppercase text-lg font-bold mb-1">{{ userProfile.accountType }}</span></p>
        </div>

        <div class="mb-5 mt-10">
          <h3 class="text-lg leading-6 font-bold text-gray-900">About Me</h3>
          <p class="mt-1 max-w-2xl text-lg text-gray-500">{{ userProfile.AboutMe }}</p>
        </div>

        <div class="mb-2">
          <h1 class="text-xl font-bold">Rankings</h1>
          <div class="flex items-center mt-2">
            <fa :icon="['fas', 'star' ]" class="text-yellow-400" v-on:click="RateUser(userProfile.id, 1)" />
            <fa :icon="['fas', 'star' ]" class="text-yellow-400" v-on:click="RateUser(userProfile.id, 1.5)" />
            <fa :icon="['fas', 'star' ]" class="text-yellow-400" v-on:click="RateUser(userProfile.id, 2)" />
            <fa :icon="['fas', 'star' ]" class="text-yellow-400" v-on:click="RateUser(userProfile.id, 2.5)" />
            <fa :icon="['fas', 'star' ]" class="text-yellow-400" v-on:click="RateUser(userProfile.id, 3)" />
          </div>
          <div class="mt-2">
           <p class="text-lg font-bold">{{ ratings }} Stars</p>
          </div>
        </div>
        

      </div>
      
    </div>
  </div>  
</template>

<script>
  import axios from "axios";
  import { SERVER_URL } from "../../constant/index";
  import apiCall from '../../constant/Api'

export default {
  data() {
      return {
        userProfile: {},
        ratings: [],
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

      apiCall('/Ratings', 'GET')
      .then((res) => {
        this.ratings = res.totalRating; 
      })
      .catch((error) => {
        console.log(error);
      })
  },
  methods: {
    RateUser(rated_user_id, ratingValue) {
      apiCall('/Ratings', 'post', {
        rating: ratingValue,
        rated_user_id: rated_user_id,
      })
      .then((res) => {
        console.log(ratingValue, rated_user_id);
        this.HandelSuccess = "You have applied the rating successfully";
      })
      .catch((error) => {
        if (error.response?.status === 400) {
          this.HandelError = "You have already applied the rating for this user";
        }
      });
    }
  },
}
</script>
