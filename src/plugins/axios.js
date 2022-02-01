import axios from "axios";
require('dotenv').config();

export default axios.create({
  baseURL: process.env.VUE_APP_NODE_ENV === 'production' ? 'https://pai-auth-api.herokuapp.com/' : 'http://localhost:3000'
});
