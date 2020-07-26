import React from "react";
import MicrosoftLogin from "react-microsoft-login";
import { saveLogin} from './util';
const redirectUri = "http://localhost:3000/";
const redirectUriP = 'https://gzhangx.github.io/bibletyping.github.io/';
//import { UserAgentApplication } from "msal";
export default (props) => {
    const authHandler = (err, data) => {
        console.log(err, data);
        if (!err) {
            console.log(data.authResponseWithAccessToken.account);
            const { userName, name } = data.authResponseWithAccessToken.account;
            console.log(`username=${userName} name=${name}`);
            const info = {
                username,
                name,
            };
            saveLogin(info);
            props.setLoginInfo(info);
        }
    };

    return (
        <MicrosoftLogin clientId={"b6ff1150-a1cd-4040-bc6e-4f43340a8f4d"}  redirectUri={redirectUriP} authCallback={authHandler} />
    );
};