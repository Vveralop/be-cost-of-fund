import { 
    BASE_URL
} from "..";
import {callApi, getToken} from "../utils";

//------- PRICING ------ //
export const calculatePricing = async (request) => {
    const url = `${BASE_URL}/pricingSimulations`;
    const json = await callApi(url,'post', getToken(), request);
    return json;
};

