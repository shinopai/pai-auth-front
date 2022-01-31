<template>
<div class="bg-grey-lighter min-h-screen flex flex-col">
            <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 class="mb-8 text-3xl text-center">Sign up</h1>
                    <input
                        type="text"
                        class="block border border-grey-light w-full p-3 rounded"
                        v-model="name"
                        placeholder="Name" />
                        <span class="block text-right" :class="{ 'text-red-500' : name.length > 20 }">{{ name.length }}/20</span>

                    <input
                        type="email"
                        class="block border border-grey-light w-full p-3 rounded mt-4"
                        v-model="email"
                        placeholder="Email" />

                    <input
                        type="password"
                        class="block border border-grey-light w-full p-3 rounded mt-8"
                        v-model="password"
                        placeholder="Password" />
                        <span class="block text-right" :class="{ 'text-red-500' : password.length > 10 }">{{ password.length }}/10</span>

                    <button
                        type="button"
                        class="w-full text-center py-3 rounded bg-green-300 text-white hover:bg-green-500 focus:outline-none my-1 mt-5" @click="signup"
                    >Register</button>

                </div>

                <div class="text-grey-dark mt-6">
                    Already have an account?
                    <router-link :to="{ name: 'login' }" class="no-underline border-b border-blue text-blue">
                        Login
                    </router-link>
                </div>
            </div>
        </div>
</template>

<script>
import { ref } from 'vue'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import Axios from '../plugins/axios'
import { useRouter } from 'vue-router'

export default {
  setup() {
    let name = ref('')
    let email = ref('')
    let password = ref('')
    const router = useRouter()

    // signup
    const signup = async () => {
      const auth = getAuth()
      createUserWithEmailAndPassword(auth, email.value, password.value)
              .then( res => {
                console.log(res)
                addDatabase(name.value, res.user.email, res.user.uid)
                router.push('/')
              })
              .catch( err => {
                console.log(err.message)
              })
          }

    // add user data to database
    const addDatabase = async (name, email, uid) => {
      await Axios.post('/api/v1/users', {
        name: name,
        email: email,
        uid: uid
      })
      .then( res => {
        console.log(res);
      })
      .catch( err => {
        console.log(err.response.data)
      })
    }

    return {
      name, email, password, signup
    }
  },
}
</script>
