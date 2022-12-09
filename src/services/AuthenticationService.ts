import { ApiLoginRequest } from "@/models/ApiRequests"
import { ApiError, ApiLoginResponse } from "@/models/ApiResponses"
import { http, MockNetworkResult } from "@/utils/http"

class AuthenticationService {
    
    async login(name: string, email: string, password: string) {
        let data: ApiLoginRequest = {
            name,
            email,
            password
        }

        // This would be a request to the backend. Since this challenge focuses only on the frontend,
        // this part will be mocked.
        // return http.post<ApiLoginResponse>("/auth/login", data)
        return new Promise<MockNetworkResult<ApiLoginResponse>>((resolve, reject) => {
            if (email === "test@eppendorf.com" && password === "Passw0rd!") {
                let response: ApiLoginResponse = {
                    access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6InRlc3RAZXBwZW5kb3JmLmNvbSIsImlhdCI6MTIzNDU2Nzg5MH0._Zac91SFocq1XyfaQCYxH_WW-G4bMD6BvxtYJ8d7zbI",
                    refresh_token: "some-refresh-token",
                }
                return resolve({
                    statusCode: 200,
                    data: response
                })
            }

            let error: ApiError = {
                message: "Invalid login credentials."
            }

            return reject({
                statusCode: 401,
                data: error
            })
        })
    }
}

export default new AuthenticationService