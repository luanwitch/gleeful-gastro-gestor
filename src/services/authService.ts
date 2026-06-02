import { api } from "./api";

export async function login(username: string, password: string){
    const response = await api.post("/token/", {
        username,
        password,
    });

    localStorage.setItem("accessToken", response.data.access);
    localStorage.setItem("refreshToken", response.data.refresh);

    return response.data;
}

export function logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.href = "/login";
}

export function getToken() {
    return localStorage.getItem("accessToken");
}

export function isAuthenticated() {
    return !!getToken();
}

