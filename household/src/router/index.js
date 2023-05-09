import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store';
import HomeView from '../views/HomeView.vue'
import  AboutView from '../views/AboutView'
import  contactView from '../views/Contact.vue'
import  CommunityView from '../views/Community.vue'
import  HowToFindJob from '../views/HowToFindJob.vue'
import  HowToCreateJob from '../views/HowToCreateJob.vue'
import  ApplicantSignupPage from '../views/Applicant.Signup.vue'
import  HomeownerSignupPage from '../views/Homeowner.Signup.vue'
import  Login from '../views/Login.vue'
import  ForgotVue from '../views/Forgot.vue'
import  ResetVue from '../views/Reset.vue'
import  Jobs from '../views/User-Dashoard/Jobs.vue'
import  jobListingId from '../views/User-Dashoard/JobListingId.vue'
import  Profile from '../views/User-Dashoard/Profile.vue'
import  UpdateProfile from '../views/User-Dashoard/UpdateProfile.vue'
import  SavedJobs from '../views/User-Dashoard/SavedJobs.vue'
import  Post from '../views/User-Dashoard/Post.vue'
import PublicProfile from '../views/User-Dashoard/Public-profile.vue'
import CreateJob from '../views/User-Dashoard/Create-job-listing.vue'
import AccountType from '../views/AccountType.vue'
import ApplicantJobListing from '../views/User-Dashoard/ApplicantJobListing.vue'


// he requireAuth function checks if the user is authenticated by checking for a valid user object with a token property in local storage. 
// If the user is authenticated, the function calls the next function to allow the user to access the next route. Otherwise,
// the function redirects the user to the login page.
// The beforeEnter property is then set on the "Jobs" route to call the requireAuth function before allowing the user to access the route.

const requireAuth = (to, from, next) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    next();
  } else {
    next({ name: "Login" });
  }
};



const routes = [
  {
    path: '/',
    name: 'home',
    component: () => {
      const isLoggedIn = JSON.parse(localStorage.getItem("user")) !== null;
      return isLoggedIn ? Jobs : HomeView;
    }
   
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
   
  },
  {
    path: '/contact',
    name: 'contact',
    component: contactView,
   
  },
  {
    path: '/community',
    name: 'community',
    component: CommunityView,
   
  },
  {
    path: '/HowToFindJob',
    name: 'HowToFindJob',
    component: HowToFindJob,
   
  },
  {
    path: '/HowToCreateJob',
    name: 'HowToCreateJob',
    component: HowToCreateJob,
   
  },
  {
    path: '/AccountType',
    name: 'AccountType',
    component: AccountType,
   
  },
  {
    path: '/Applicant',
    name: 'Applicant',
    component: ApplicantSignupPage,
   
  },
  {
    path: '/Homeowner',
    name: 'Homeowner',
    component: HomeownerSignupPage,
   
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login,
   
  },
  {
    path: '/Forgot-Password',
    name: 'Forgot-Password',
    component: ForgotVue,
   
  },
  {
    path: '/Reset-Password/:id',
    name: 'Reset-Password',
    component: ResetVue,
   
  },
  {
    path: "/jobs",
    name: "Jobs",
    component: Jobs,
    meta: {
      requiresAuth: true
    },
    beforeEnter: requireAuth
  },
  {
    path: '/JobListingById/:id',
    name: 'JobListing',
    component: jobListingId,
    meta: {
      requiresAuth: true
    },
    beforeEnter: requireAuth
  },
  {
    path: '/Saved-Jobs',
    name: 'Saved-Jobs',
    component: SavedJobs,
    meta: {
      requiresAuth: true
    },
    beforeEnter: requireAuth
  },
  {
    path: '/Create-job-listing',
    name: 'Create-job-listing',
    component: CreateJob,
    meta: {
      requiresAuth: true
    },
    beforeEnter: requireAuth
  },
  {
    path: '/ApplicantJobListing/:id',
    name: 'ApplicantJobListing',
    component: ApplicantJobListing,
    meta: {
      requiresAuth: true
    },
    beforeEnter: requireAuth
  },
  {
    path: '/Post',
    name: 'Post',
    component: Post,
    meta: {
      requiresAuth: true
    },
    beforeEnter: requireAuth
  },
  {
    path: '/Profile/:id',
    name: 'Profile',
    component: Profile,
    meta: {
      requiresAuth: true
    },
    beforeEnter: requireAuth
  },
  {
    path: '/public-profile/:id',
    name: 'PublicProfile',
    component:  PublicProfile,
    meta: {
      requiresAuth: true
    },
    beforeEnter: requireAuth
  },
  {
    path: '/profile/UpdateProfile/:id',
    name: 'UpdateProfile',
    component:  UpdateProfile,
    meta: {
      requiresAuth: true
    },
    beforeEnter: requireAuth
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


export default router
