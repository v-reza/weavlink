import axios from "axios";
const api = process.env.NEXT_APP_API || "http://localhost:1000/api";

export function axiosGet(url, config = null) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${api}${url}`, config)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
}
export function axiosPost(url, data = null, config = null) {
  return new Promise((resolve, reject) => {
    axios
      .post(`${api}${url}`, data, config)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
}
export function axiosPut(url, data = null, config = null) {
  return new Promise((resolve, reject) => {
    axios
      .put(`${api}${url}`, data, config)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
}
export function axiosDelete(url, config = null) {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${api}${url}`, config)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
}
