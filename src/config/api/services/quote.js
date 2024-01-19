import { 
    BASE_URL
} from "..";
import {callApi, getToken} from "../utils";

//------- PRICING ------ //
export const saveCfQuote = async (request) => {
    const url = `${BASE_URL}/cfquote`;
    const json = await callApi(url,'post', getToken(), request);
    return json;
};



export const listCfQuotes = async (request) => {
    const url = `${BASE_URL}/cfquote/list`;
    const json = await callApi(url,'get', getToken(), request);
    return json;
};

export const listCfQuotesByUser = async (userId,request) => {
    const url = `${BASE_URL}/cfquote/listuser/${userId}`;
    const json = await callApi(url,'get', getToken(), request);
    return json;
};


export const updateCfQuote = async (request) => {
    const url = `${BASE_URL}/cfquote/statusChange`;
    const json = await callApi(url,'patch', getToken(), request);
    return json;
};