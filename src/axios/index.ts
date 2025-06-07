import axios from "axios";
import { useAuthStore } from "../store/authStore";
const baseURL = import.meta.env.VITE_APP_API_URL;
import router from "../router";
const apiClient = axios.create({
  baseURL: baseURL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Add a request interceptor
apiClient.interceptors.request.use(
  function (config) {
    const token = useAuthStore().getAccessToken;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
apiClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response?.data;
  },
  async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const { data, status, statusText } = error.response;

    if (status === 401) {
      const authStore = useAuthStore();
      const currentRoute = router.currentRoute.value;
      if (!currentRoute.meta.guest || !currentRoute.meta.authCheckNotRequired) {
        // authStore.clearAuthUser();
        await router.push({ name: "login" });
      }
    }

    return Promise.reject({ data, status, statusText });
  }
);

export default apiClient;