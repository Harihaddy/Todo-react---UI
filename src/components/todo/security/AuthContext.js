import { useContext } from "react";
import { createContext, useState } from "react";
import { apiClient } from "../api/ApiClient";
import { executeJWTAuthenticationSevice, executebasicAuthenticationSevice } from "../api/AuthApiService";

export const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)
export default function AuthProvider({ children }) {
    const [isAuthenticated, setAuthenticated] = useState(false)
    const [username, setUsername] = useState(null)
    const [Token, setToken] = useState(null)

    // async function login(username, password) {
    //     const beToken = 'Basic ' + window.btoa(username + ":" + password)
    //     try {
    //         const response = await executebasicAuthenticationSevice(beToken)
    //         if (response.status === 200) {
    //             setAuthenticated(true)
    //             setUsername(username)
    //             setToken(beToken)

    //             apiClient.interceptors.request.use(
    //                 (config) => {
    //                     console.log('interceptors add a token')
    //                     config.headers.Authorization = Token
    //                     return config
    //                 }
    //             )

    //             return true
    //         } else {
    //             logout()
    //             return false

    //         }
    //     } catch (error) {
    //         logout()
    //         return false

    //     }
    // }

    async function login(username, password) {
        try {
            const response = await executeJWTAuthenticationSevice(username,password)
            if (response.status === 200) {
                const jwtToken='Bearer '+ response.data.Token
                setAuthenticated(true)
                setUsername(username)
                setToken(jwtToken)

                apiClient.interceptors.request.use(
                    (config) => {
                        console.log('interceptors add a token')
                        config.headers.Authorization = jwtToken
                        return config
                    }
                )

                return true
            } else {
                logout()
                return false

            }
        } catch (error) {
            logout()
            return false

        }
    }
    function logout() {
        setAuthenticated(false)
        setToken(null)
        setUsername(null)
    }
    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, username, Token }}>
            {children}
        </AuthContext.Provider>
    )
}