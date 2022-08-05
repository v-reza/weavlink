import axios from "axios";
const api = "http://localhost:1000/api";
// const api = "https://velxapi.herokuapp.com/api"

export async function axiosGet(url, config = null) {
  return await axios.get(api + url, config);
}
export async function axiosPost(url, data = null, config = null) {
  return await axios.post(api + url, data, config);
}
export async function axiosPut(url, data = null, config = null) {
  return await axios.put(api + url, data, config);
}
export async function axiosDelete(url, config = null) {
  return await axios.delete(api + url, config);
}
