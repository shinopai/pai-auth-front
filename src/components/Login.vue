<template>
  <div class="bg-grey-lighter min-h-screen flex flex-col">
            <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 class="mb-8 text-3xl text-center">Login</h1>
                    <input
                        type="email"
                        class="block border border-grey-light w-full p-3 rounded mb-4"
                        v-model="email"
                        placeholder="Email" />

                    <input
                        type="password"
                        class="block border border-grey-light w-full p-3 rounded mb-4"
                        v-model="password"
                        placeholder="Password" />

                    <button
                        type="button"
                        class="w-full text-center py-3 rounded bg-yellow-300 text-white hover:bg-yellow-500 focus:outline-none my-1" @click="login"
                    >Login</button>

                </div>

                <div class="text-grey-dark mt-6">
                    are you new to PaiAuth?
                    <router-link :to="{ name: 'signup' }" class="no-underline border-b border-blue text-blue">
                        Signup
                    </router-link>
                </div>
            </div>
        </div>
</template>

<script>
import { ref } from 'vue'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { useRouter } from 'vue-router'

export default {
  setup() {
    let email = ref('')
    let password = ref('')
    const router = useRouter()

    // login
    const login = async () => {
      const auth = getAuth()
      signInWithEmailAndPassword(auth, email.value, password.value)
              .then( res => {
                console.log(res.user)
                router.push('/')
              })
              .catch( err => {
                console.log(err.message)
              })
          }

    return {
      email, password, login
    }
  },
}
</script>
