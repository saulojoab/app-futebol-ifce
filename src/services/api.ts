import axios from "axios";

export const api = axios.create({
  //baseURL: "https://insidious-like-piper.glitch.me",
  baseURL: "http://localhost:8765",
});
