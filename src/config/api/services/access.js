import { BASE_URL } from "..";
import { callApi, getToken } from "../utils";

//------- PRODUCTS ------ //
export const getAccesModules = async () => {
  const url = `${BASE_URL}/access`;
  const json = await callApi(url, "GET", getToken(), null);
  return json;
};
