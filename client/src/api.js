// const BASE_URL = process.env.REACT_APP_API || "http://localhost:3000/api";
const BASE_URL = "/api";

const api = {
  baseUrl: BASE_URL,
  getAnimes: `${BASE_URL}/anime`,
  getMyAnimeReco: `${BASE_URL}/anime_my_reco`,
};

export default api;
