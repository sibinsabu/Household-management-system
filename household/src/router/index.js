import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import  AboutView from '../views/AboutView'
import  contactView from '../views/Contact.vue'
import  CommunityView from '../views/Community.vue'
import  HowToFindJob from '../views/HowToFindJob.vue'
import  HowToCreateJob from '../views/HowToCreateJob.vue'
import  Applicant from '../views/Applicant.Signup.vue'
import  Homeowner from '../views/Homeowner.Signup.vue'
import  Login from '../views/Login.vue'
import  ForgotVue from '../views/Forgot.vue'
import  ResetVue from '../views/Reset.vue'
import  Jobs from '../views/User-Dashoard/Jobs.vue'
import  jobListingId from '../views/User-Dashoard/JobListingId.vue'
import  Profile from '../views/User-Dashoard/Profile.vue'
import  SavedJobs from '../views/User-Dashoard/SavedJobs.vue'
import  Post from '../views/User-Dashoard/Post.vue'
import Reviews from '../views/User-Dashoard/Reviews.vue'
import PublicProfile from '../views/User-Dashoard/Public-profile.vue'
import CreateJob from '../views/User-Dashoard/Create-job-listing.vue'
import AccountType from '../views/AccountType.vue'

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
    path: '/HowToFindJob',
    name: 'HowToFindJob',
    component: HowToFindJob
  },
  {
    path: '/HowToCreateJob',
    name: 'HowToCreateJob',
    component: HowToCreateJob
  },
  {
    path: '/AccountType',
    name: 'AccountType',
    component: AccountType 
  },
  {
    path: '/Applicant',
    name: 'Applicant',
    component: Applicant
  },
  {
    path: '/Homeowner',
    name: 'Homeowner',
    component: Homeowner
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
