import { apiClient } from "./ApiClient";

export const executebasicAuthenticationSevice=(Token)=> apiClient.get(`/basicauth`,
{
    headers:{
        Authorization:Token
    }
})
export const executeJWTAuthenticationSevice=(username,password)=> apiClient.post(`/authenticate`,
{username,password}
)