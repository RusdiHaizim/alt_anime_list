const BASE_URL = process.env.REACT_APP_API || "http://localhost:3000/api";

export default {
  baseUrl: BASE_URL,
  getAnimes: `${BASE_URL}/anime`,
};
