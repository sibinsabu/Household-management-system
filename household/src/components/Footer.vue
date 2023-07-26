<template>
      <footer class="bg-gray-800">
    <div class="max-w-7xl mx-auto py-5 px-4 overflow-hidden sm:px-6 lg:px-8">
      <nav class="flex flex-wrap justify-center">
        <div class="px-5 py-2">
          <a href="/about" class="text-base font-medium text-white hover:text-gray-300">About Us</a>
        </div>
        <div class="px-5 py-2">
          <a href="/contact" class="text-base font-medium text-white hover:text-gray-300">Contact Us</a>
        </div>
        <div class="px-5 py-2">
          <a href="/community" class="text-base font-medium text-white hover:text-gray-300">Community</a>
        </div>
        <div class="px-5 py-2">
          <a href="#" class="text-base font-medium text-white hover:text-gray-300">Terms of Service</a>
        </div>
      </nav>

      <div class="mt-8 flex justify-center space-x-6">
        <p  class="text-gray-400 hover:text-gray-300">
          <span class="sr-only">Facebook</span>
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <fa :icon="['fab', 'facebook' ]" />
          </svg>
        </p>

        <p  class="text-gray-400 hover:text-gray-300">
          <span class="sr-only">Facebook</span>
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <fa :icon="['fab', 'instagram' ]" />
          </svg>
        </p>

        <p  class="text-gray-400 hover:text-gray-300">
          <span class="sr-only">Facebook</span>
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <fa :icon="['fab', 'twitter' ]" />
          </svg>
        </p>
      </div>

      <p class="mt-8 text-center text-gray-400 text-sm">&copy; 2023 Mohamed Ahmed / Brian murimi</p>
    </div>
  </footer>
</template>

