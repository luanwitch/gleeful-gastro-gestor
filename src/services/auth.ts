export function isAuthenticated() {
  if (typeof window === "undefined") {
    return false;
  }

  return !!window.localStorage.getItem("accessToken");
}

export function logout() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }
}