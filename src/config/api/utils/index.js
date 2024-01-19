import axios from "axios";
// MSAL imports
import { PublicClientApplication } from "@azure/msal-browser";
import { CLIENT_ID, CLIENT_SECRET } from "../index";
import { msalConfig, loginRequest } from "../../../authConfig";


export const callApi = async (url, method, token, body) => {
  const instance = new PublicClientApplication(msalConfig);
  let accessToken;

  const account = instance.getActiveAccount();
  if (!account) {
      throw Error("No active account! Verify a user has been signed in and setActiveAccount has been called.");
  }

  const response = await instance.acquireTokenSilent({
      ...loginRequest,
      account: account
  });
  // console.log("response_msal",response)

  // accessToken = response.accessToken;
  accessToken = response.idToken ;
  console.log("::::::::::::::::::::::::::",accessToken)

  const bearer = `Bearer ${accessToken}`;

  let options = {
    method: method,
    url: url,
    headers: {
      "x-client-id": CLIENT_ID,
      "x-client-secret": CLIENT_SECRET,
      "Authorization": bearer,
      "Content-Type": "application/json",
    },
  };

  if (method !== "DELETE") {
    Object.assign(options, { data: JSON.stringify(body) });
  }

  try {
    const response = await axios(options);

    const json = response.data;

    return json;
  } catch (error) {
    console.log(`ERROR ${url}`, error);
    if(error?.response?.status === 401){
      return {
        code: error.code,
        message:error.message,
        statusCode: error.response.status
      }
    }
    return error.json();
  }
};

export const getToken = () => {
  const token = localStorage.getItem("oauth-token");
  return token ? token : "";
};
