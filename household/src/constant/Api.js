import axios from "axios";
const BASE_URL = "https://household-v4wd.onrender.com";

 const apiCall = async (url, method, data = {}, headers = {}) => {
  const user = localStorage.getItem("user");
  const token = user ? JSON.parse(user).token : null;
  const config = {
    headers: { Authorization: `${token}`, ...headers },
  };

  try {
    const res = await axios({ method, url, data, baseURL: BASE_URL,...config, });
    return res.data;
  } catch (err) {
    const error = err.response?.data?.message
    console.log(error)
    throw err;
  }
};


export default apiCall;
