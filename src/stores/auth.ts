import { defineStore } from "pinia"
import router from "@/router/router"
import AuthenticationService from "@/services/AuthenticationService"
import { ApiLoginResponse } from "@/models/ApiResponses"
import User from "@/models/User"

interface State {
    accessToken?: string
    refreshToken?: string
    user?: User
}

export const useAuthStore = defineStore({
    id: 'auth',
    state: (): State => ({
        accessToken: undefined,
        refreshToken: undefined,
        user: undefined
    }),

    getters: {
        isLoggedIn: (state) => state.accessToken != undefined && state.user != undefined,
    },

    actions: {
        async login(name: string, email: string, password: string) {
            if (this.isLoggedIn) {
                throw Error('Already logged in!')
            }

            // Get login data from API
            let { data } = await AuthenticationService.login(name, email, password)
            
            // Store the login data if the call was successful
            this.storeLoginData(data)

            // Save the user data. Ideally this would also be delivered by the backend.
            this.user = { name, email }

            // Show the main screen
            router.push('/')
        },

        async logout() {
            try {
                await AuthenticationService.logout()
            } catch (error) {
                // Fail silently
            }

            // Reset this store
            this.$reset()
            localStorage.removeItem('refreshToken')

            // Show the login screen
            router.push('/login')
        },


        storeLoginData(data: ApiLoginResponse) {
            // Store the data volatilely
            this.accessToken = data.access_token
            this.refreshToken = data.refresh_token

            // Store refresh token in localStorage to keep the login even after the page is reloaded.
            localStorage.setItem('refreshToken', this.refreshToken)
        }
    }
})