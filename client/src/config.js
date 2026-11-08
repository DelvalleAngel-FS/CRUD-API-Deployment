// Switches between local development port or the relative production path seamlessly
export const API_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000/api/animals"
    : "/api/animals";
