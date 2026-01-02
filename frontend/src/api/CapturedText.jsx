import { api } from "./client";

export function listCapturedText() {
  return api.get("captured-text/");
}

export function createCapturedText(content) {
  return api.post("captured-text/", { content });
}

export function updateCapturedText(id, payload) {
  return api.patch(`captured-text/${id}/`, payload);
}


export function deleteCapturedText(id) {
  return api.delete(`captured-text/${id}/`);
}
