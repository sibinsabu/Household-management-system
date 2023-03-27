import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import  AboutView from '../views/AboutView'
import  contactView from '../views/Contact.vue'
import  CommunityView from '../views/Community.vue'
import  findJobs from '../views/findJob.vue'
import  createJobs from '../views/createJob.vue'
import  Signup from '../views/Signup.vue'
import  Login from '../views/Login.vue'
import  ForgotVue from '../views/Forgot.vue'
import  ResetVue from '../views/Reset.vue'
import  Jobs from '../views/Jobs.vue'
import  jobListingId from '../views/JobListingId.vue'
import  Profile from '../views/Profile.vue'
import  SavedJobs from '../views/SavedJobs.vue'
import  Post from '../views/Post.vue'
import Reviews from '../views/Reviews.vue'
import PublicProfile from '../views/Public-profile.vue'
import CreateJob from '../views/Create-job-listing.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/contact',
    name: 'contact',
    component: contactView
  },
  {
    path: '/community',
    name: 'community',
    component: CommunityView
  },
  {
    path: '/find-Jobs',
    name: 'find-Jobs',
    component: findJobs
  },
  {
    path: '/Job-listing',
    name: 'Job-listing',
    component: createJobs
  },
  {
    path: '/Signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login
  },
  {
    path: '/Forgot-Password',
    name: 'Forgot-Password',
    component: ForgotVue
  },
  {
    path: '/Reset-Password',
    name: 'Reset-Password',
    component: ResetVue
  },
  {
    path: '/Jobs',
    name: 'Jobs',
    component: Jobs
  },
  {
    path: '/JobListingById',
    name: 'JobListing',
    component: jobListingId
  },
  {
    path: '/Saved-Jobs',
    name: 'Saved-Jobs',
    component: SavedJobs
  },
  {
    path: '/Create-job-listing',
    name: 'Create-job-listing',
    component: CreateJob
  },
  {
    path: '/Post',
    name: 'Post',
    component: Post
  },
  {
    path: '/Reviews',
    name: 'Reviews',
    component: Reviews
  },
  {
    path: '/Profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/public-profile',
    name: 'PublicProfile',
    component:  PublicProfile
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
