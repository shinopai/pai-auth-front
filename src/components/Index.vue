<template>
  <div class="w-2/3 mx-auto mt-10">
    <span v-if="currentUser.name">名前:&nbsp;{{ currentUser.name }}</span>
    <span v-else>ログイン又はユーザー登録してください</span>

      <div class="w-1/2 mt-5">
            <div v-if="currentUser.name" class="flex flex-col space-y-3">
               <div
                  class="flex items-center bg-white border border-gray-300 rounded px-2"
               >
                  <input
                     type="text"
                     placeholder="your task"
                     class="w-full py-2 px-1 placeholder-indigo-400 outline-none placeholder-opacity-50" v-model="taskTitle"
                     autocomplete="off"
                  />
               </div>
               <div
                  class="flex items-center pr-2"
               >
               <button
                  type="button"
                  class="text-white bg-indigo-500 px-4 py-2 rounded w-1/3" @click="addTask"
               >
                  追加
               </button>
               <span class="ml-auto" :class="{ 'text-red-500' : taskTitle.length > 20 }">0/20</span>
               </div>
            </div>
      </div>

     <div class="w-full mt-10">
      <h1 class="bg-gray-700 text-white p-2 font-bold text-lg">Task list</h1>
      <div class="flex justify-center">
  <div class="mb-3 xl:w-96 ml-auto">
    <input
      type="search"
      class="
        form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none mt-3
      "
      id="exampleSearch"
      placeholder="Search" v-model="search"
    />
  </div>
</div>
      <table class="table-auto mt-5 w-full">
  <thead class="text-left">
    <tr>
      <th class="px-4 py-2">タイトル</th>
      <th class="px-4 py-2">ユーザー</th>
      <th class="px-4 py-2">Actions</th>
    </tr>
  </thead>
  <tbody>
    <template v-if="tasks.length > 0">
    <tr v-for="task in tasks" :key="task">
      <td class="border px-4 py-2">{{ task.title }}</td>
      <td class="border px-4 py-2">{{ task.name }}</td>
      <td class="border px-4 py-2"><fa v-if="task.user_id == currentUser.id" icon="trash-alt" class="cursor-pointer" @click="deleteTask(task.id)"></fa></td>
    </tr>
    </template>
    <tr v-else>
      <td>タスクがありません</td>
    </tr>
  </tbody>
</table>
  </div>
  </div>
</template>

<script>
import { onMounted, ref, watch } from 'vue'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Axios from '../plugins/axios'

export default {
  setup() {
    const currentUser = ref([])
    const taskTitle = ref('')
    const tasks = ref([])
    const search = ref('')

    // get current user
    const getCurrentUser = async () => {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid
        console.log(uid);
        getData(uid)
      } else {
        // User is signed out
        console.log('no user loggedin')
      }
      });
    }

    const getData = async (uid) => {
      await Axios.get('/api/v1/users', {
        params: {
                uid: uid
                }
                })
                 .then( res => {
                   currentUser.value = res.data
                   console.log(currentUser.value);
                 })
                 .catch( err => {
                   console.log(err.response.data)
                 })
    }

    // get all tasks
    const getAllTasks = async () => {
      await Axios.get('/api/v1/tasks')
                 .then( res => {
                   tasks.value = res.data
                   console.log(tasks.value);
                 })
                 .catch( err => {
                   console.log(err.response.data)
                 })
    }

    // add task
    const addTask = async () => {
      await Axios.post('/api/v1/tasks', {
        title: taskTitle.value,
        user_id: currentUser.value.id
      })
                 .then( res => {
                   console.log(res)
                   taskTitle.value = ''
                   getAllTasks()
                 })
                 .catch( err => {
                   console.log(err.response.data)
                 })
    }

    // delete task
    const deleteTask = async (taskId) => {
      if(confirm('Are you sure?')){
        await Axios.delete('/api/v1/tasks/' + taskId)
                   .then( res => {
                     console.log(res.data)
                      getCurrentUser()
                      getAllTasks()
                   })
                   .catch( err => {
                     console.log(err.response.data)
                   })
      }
    }

    // get search task
    const getSearchTask = async () => {
      await Axios.get('/api/v1/tasks/search', {
        params: {
          search: search.value
        }
      }).then( res => {
        tasks.value = res.data
      })
        .catch( err => {
          console.log(err.response.data)
        })
    }

    watch(
      () => search.value, () => {
        getSearchTask()
      }
    )

    onMounted(() => {
      getCurrentUser()
      getAllTasks()
    })

    return {
      currentUser, taskTitle, tasks, addTask, deleteTask, search
    }
}
}
</script>
