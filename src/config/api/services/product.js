import { 
    BASE_URL
} from "..";
import {callApi, getToken} from "../utils";

//------- PRODUCTS ------ //
export const getAllProducts = async () => {
    const url = `${BASE_URL}/product`;
    const json = await callApi(url,"GET", getToken(),null);
    return json;
};

