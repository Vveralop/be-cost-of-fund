import { LogLevel } from "@azure/msal-browser";
import { AD_AUTHORITY, AD_CLIENT_ID } from "./config/api";
// Browser check variables
// If you support IE, our recommendation is that you sign-in using Redirect APIs
// If you as a developer are testing using Edge InPrivate mode, please add "isEdge" to the if check
// const ua = window.navigator.userAgent;
// const msie = ua.indexOf("MSIE ");
// const msie11 = ua.indexOf("Trident/");
// const msedge = ua.indexOf("Edge/");
// const firefox = ua.indexOf("Firefox");
// const isIE = msie > 0 || msie11 > 0;
// const isEdge = msedge > 0;
// const isFirefox = firefox > 0; // Only needed if you need to support the redirect flow in Firefox incognito

// Config object to be passed to Msal on creation
export const msalConfig = {
  auth: {
    // clientId: "5e3937dc-6d21-4a08-90be-035efaa6a62f", // (EXAMPLE)This is the ONLY mandatory field that you need to supply.
    clientId: AD_CLIENT_ID, // (EXAMPLE)This is the ONLY mandatory field that you need to supply.
    authority: AD_AUTHORITY, // (EXAMPLE) Defaults to "https://login.microsoftonline.com/common"
    redirectUri: "/",
    postLogoutRedirectUri: "/login",
    navigateToLoginRequestUrl: false,
  },
  cache: {
    cacheLocation: "sessionStorage",
    //         storeAuthStateInCookie: isIE || isEdge || isFirefox,
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
          default:
            return;
        }
      },
    },
  },
};

// Add here scopes for id token to be used at MS Identity Platform endpoints.
export const loginRequest = {
  scopes: [
    "openid",
    "profile",
    "email",
    "81edadcd-bd3a-42b0-9464-58f701e9b7fd/.default",
  ],
};

/**
 * An optional silentRequest object can be used to achieve silent SSO
 * between applications by providing a "login_hint" property.
 */
export const silentRequest = {
  scopes: ["openid", "profile", "user.read"],
  loginHint: "example@domain.net",
};
