const accountId = "e0b6c1fd-e2e7-49fa-b9ff-671c35d414a0";
const Ocp_Apim_Subscription_Key = "f70e6ddb41b74a5880d773f63bc1c1ab";
const AccessToken = "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJBY2NvdW50SWQiOiJlMGI2YzFmZC1lMmU3LTQ5ZmEtYjlmZi02NzFjMzVkNDE0YTAiLCJQZXJtaXNzaW9uIjoiQ29udHJpYnV0b3IiLCJFeHRlcm5hbFVzZXJJZCI6IjE3OTI1MDlFQjZERTRDMjBCMjAzOTEzRDlEOUI3NDdBIiwiVXNlclR5cGUiOiJNaWNyb3NvZnRDb3JwQWFkIiwiSXNzdWVyTG9jYXRpb24iOiJUcmlhbCIsIm5iZiI6MTY2ODYyOTc0MiwiZXhwIjoxNjY4NjMzNjQyLCJpc3MiOiJodHRwczovL2FwaS52aWRlb2luZGV4ZXIuYWkvIiwiYXVkIjoiaHR0cHM6Ly9hcGkudmlkZW9pbmRleGVyLmFpLyJ9.t1pYjtiVWXF7gRD2doso-qfVz1jVOvuoN4_Hw8w35vM"

export async function getAccessToken() {
  try {
    const url = `https://api.videoindexer.ai/Auth/trial/Accounts/${accountId}/AccessTokenWithPermission?permission=Contributor`;
    const response = await fetch(url, {
      headers: {
        "Ocp-Apim-Subscription-Key": Ocp_Apim_Subscription_Key,
      },
    });
    
    return await response.json();
  } catch (error) {
    
    return [];
  }
}

export function getVideoList(videoAccessToken) {

  try {
  
    const url = `https://api.videoindexer.ai/trial/Accounts/${accountId}/Videos?pageSize=25&skip=0&accessToken=${AccessToken}`;
    
    const response =  fetch(url);
    
    return  response.json();
  } catch (error) {
    
    return [];
  }
}
