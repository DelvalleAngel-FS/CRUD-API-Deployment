// Matches your exact local port (5000) and base endpoint path (/animals)
export const API_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000/animals"
    : "/animals";
