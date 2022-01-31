import {
  initializeApp
} from 'firebase/app'

const firebaseConfig = {
  apiKey: "AIzaSyAyAW-6eprrDSZYTaD6JQsXUmIqaosjCd0",
  authDomain: "pai-auth.firebaseapp.com",
  projectId: "pai-auth",
  storageBucket: "pai-auth.appspot.com",
  messagingSenderId: "521137822718",
  appId: "1:521137822718:web:58842953753098b084feaf"
};

const firebase = initializeApp(firebaseConfig)

export default firebase
