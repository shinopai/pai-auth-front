<template>
<nav class="w-full py-6 bg-gray-700 text-white w-screen">
  <div class="flex items-center justify-between mx-auto xl:max-w-7xl lg:max-w-5xl md:max-w-3xl md:px-2 px-4">
    <section class="flex items-center space-x-2">
      <router-link :to="{ name: 'index' }" class="font-bold text-xl focus:ring focus:ring-purple-500 focus:ring-opacity-25 outline-none rounded-lg ml-5">PaiAuth</router-link>
    </section>
    <section>
      <ul class="md:space-x-8 space-x-6 font-semibold hidden md:flex mr-5">
        <li class="relative group">
          <router-link :to="{ name: 'index' }" class="group focus:ring focus:ring-purple-500 focus:ring-opacity-25 outline-none rounded-lg">Home</router-link>
          <div class="w-full h-0.5 bg-transparent group-hover:bg-purple-500 transition-al absolute bottom-0" />
        </li>
        <template v-if="loginMessage">
        <li class="relative group">
          <router-link :to="{ name: 'login' }" class="group focus:ring focus:ring-purple-500 focus:ring-opacity-25 outline-none rounded-lg">Login</router-link>
          <div class="w-full h-0.5 bg-transparent group-hover:bg-purple-500 transition-al absolute bottom-0" />
        </li>
        <li class="relative group">
          <router-link :to="{ name: 'signup' }" class="focus:ring focus:ring-purple-500 focus:ring-opacity-25 outline-none rounded-lg">Signup</router-link>
          <div class="w-full h-0.5 bg-transparent group-hover:bg-purple-500 transition-al absolute bottom-0" />
        </li>
        </template>
        <template v-else>
        <li class="relative group">
          <button class="group focus:ring focus:ring-purple-500 focus:ring-opacity-25 outline-none rounded-lg font-bold" @click="logout">Logout</button>
          <div class="w-full h-0.5 bg-transparent group-hover:bg-purple-500 transition-al absolute bottom-0" />
        </li>
        </template>
      </ul>
      <button class="flex md:hidden hover:bg-gray-100 p-2 rounded-full transition-all focus:ring focus:ring-purple-500 focus:ring-opacity-25 active:bg-gray-200 outline-none">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z" clip-rule="evenodd" />
        </svg>
      </button>
    </section>
  </div>
</nav>
</template>

<script>
import { onMounted, ref } from 'vue'
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from 'vue-router'

export default {
  setup() {
    const uid = ref('')
    const router = useRouter()
    const loginMessage = ref('')

    // get current user
    const getCurrentUser = async () => {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
      if (user) {
        uid.value = user.uid
      } else {
        // User is signed out
        loginMessage.value = 'No user loggedin'
      }
      });
    }

    // logout
    const logout = () => {
      const auth = getAuth();
      signOut(auth).then(() => {
        router.push('/login')
      }).catch((error) => {
         console.log(error)
      });
    }

    onMounted(() => {
      getCurrentUser()
    })

    return {
      uid, loginMessage, logout
    }
  },
}
</script>
