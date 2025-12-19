import axios from "axios";

const API_BASE = "http://127.0.0.1:8000/captured-text/";

export function listCapturedText() {
  return axios.get(API_BASE);
}

export function createCapturedText(content) {
  return axios.post(API_BASE, { content });
}

export function deleteCapturedText(id) {
  return axios.delete(`${API_BASE}${id}/`)
}