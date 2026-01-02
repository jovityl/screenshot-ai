import { api } from "./client";

export async function register(username, password) {
    return api.post("auth/register/", { username, password });
}

export async function login(username, password) {
    const response = await api.post("auth/token/", { username, password});
    localStorage.setItem("accessToken", response.data.access);
    localStorage.setItem("refreshToken", response.data.refresh);
    return response.data
}

export function logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
}
