import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8000/wp-json/wp/v2",
  headers: {
    "Content-type": "application/json",
    Authorization:
      "Bearer your identification token",
  },
});