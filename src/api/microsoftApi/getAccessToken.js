import axios from "axios";

const MicrosoftAccessTokenUrl = `https://api.videoindexer.ai/Auth/trial/Accounts/e0b6c1fd-e2e7-49fa-b9ff-671c35d414a0/AccessTokenWithPermission?permission=Contributor`;

const getMicrosoftAccessToken = async () => {
  let result = axios.get(MicrosoftAccessTokenUrl);
  
  return await result;
};

export default getMicrosoftAccessToken;
