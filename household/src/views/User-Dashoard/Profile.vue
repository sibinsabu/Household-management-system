<template>
<div>
  <div class="max-w-7xl mx-auto my-20 px-4 md:px-0">
    <div class="flex flex-col md:flex-row justify-center items-center">
      <div class="md:w-20 lg:w-60 md:mr-4  md:mb-0">
        <img class="h-full w-40 lg:w-60 object-cover rounded-full" src="../../assets/images/photo-1633332755192-727a05c4013d.jpg" alt="Banner Image">
      </div>

      <div class="md:ml-10 mt-10">
        <div class="mb-2">
          <h1 class="uppercase text-lg leading-6  text-gray-900 mb-2">Account Name: <span class="font-bold text-purple-800 uppercase text-2xl font-bol">Jeremy Rose</span></h1>
          <p class="text-lg leading-6  text-gray-900 mb-2">Location: <span class="uppercase text-lg font-bold mb-1">New York, NY</span></p>            
          <p class="text-lg leading-6  text-gray-900 mb-2">Job Title: <span class="uppercase text-lg font-bold mb-1">Nanny</span></p>
          <p class="text-lg leading-6  text-gray-900 mb-2">Account Type: <span class="uppercase text-lg font-bold mb-1">Applicant</span></p>
        </div>

        <div class="mb-5 mt-10">
          <h3 class="text-lg leading-6 font-bold text-gray-900">About Me</h3>
          <p class="mt-1 max-w-2xl text-lg text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste voluptate aspernatur blanditiis illum reprehenderit placeat. Neque ut quo pariatur sunt velit? Sapiente vero quaerat ipsam accusamus? Qui voluptatem corporis aut.</p>
        </div>

        <div class="mb-2">
          <h1 class="text-xl font-bold">Rankings</h1>
          <div class="flex items-center mt-2">
             <fa :icon="['fas', 'star' ]" class="text-yellow-400" />
              <fa :icon="['fas', 'star' ]" class="text-yellow-400" />
              <fa :icon="['fas', 'star' ]" class="text-yellow-400" />
              <fa :icon="['fas', 'star' ]" class="text-yellow-400" />
              <fa :icon="['fas', 'star' ]" class="text-yellow-400" />
              <fa :icon="['fas', 'star' ]" class="text-yellow-400" />
           </div>
        </div>

        <div class="flex flex-col md:flex-row items-center mt-5">
          <a href="#" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md mb-2 md:mb-0 md:mr-2">Send Message</a>
        </div>
      </div>
    </div>
  </div>

  <div class="max-w-7xl mx-auto my-20 px-4 md:px-0">
  <h2 class="text-3xl font-bold mb-10">My Blog Posts</h2>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    <div class="flex bg-white rounded-lg shadow-lg">
      <img class="h-48 w-full object-cover m-auto" src="../../assets/images/photo-1633332755192-727a05c4013d.jpg" alt="Blog Post 1">
      <div class="p-6">
        <p class="text-gray-600 text-sm mb-2">May 1, 2023</p>
        <h3 class="text-lg font-bold mb-2">My First Blog Post</h3>
        <p class="text-gray-700">Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, ea fugit</p>
      </div>
     </div>

     <div class="flex bg-white rounded-lg shadow-lg">
      <img class="h-48 w-full object-cover m-auto" src="../../assets/images/photo-1633332755192-727a05c4013d.jpg" alt="Blog Post 1">
      <div class="p-6">
        <p class="text-gray-600 text-sm mb-2">May 1, 2023</p>
        <h3 class="text-lg font-bold mb-2">My First Blog Post</h3>
        <p class="text-gray-700">Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, ea fugit</p>
      </div>
     </div>
  </div>
  </div>
</div>
</template>

<script>
export default {
}
</script>
