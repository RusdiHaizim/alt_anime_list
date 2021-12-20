import axios from "axios";
import api from "../api";

export const getAnimes = async (data) => {
  const { query, page } = data;
  // console.log("get anime call:", query);
  const resp = await axios.get(api.getAnimes, {
    params: {
      query: query,
      page: page,
    },
  });
  return resp;
};

export const getMyAnimeReco = async (data) => {
  const { query } = data;
  // console.log("get anime reco:", query);
  const resp = await axios.get(api.getMyAnimeReco, {
    params: {
      query: query,
    },
  });
  return resp;
};
