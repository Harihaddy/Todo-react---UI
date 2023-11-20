import { apiClient } from "./ApiClient"


export const retriveHelloWorldBean=()=> apiClient.get('/hello-world-bean')
export const retriveHelloWorldPathVariable=(username,Token)=> apiClient.get(`/hello-world/path-variable/${username}`
// ,{
//     headers:{
//         Authorization:Token
//     }
// }
)
