import { defineStore } from "pinia"
import router from "@/router/router"

interface State {
    access_token?: string
    refresh_token?: string
}

export const useAuthStore = defineStore({
    id: 'auth',
    state: (): State => ({

    }),

    getters: {
        isLoggedIn: (state) => state.access_token != undefined,
    },

    actions: {
        async login(username: string, password: string) {
            if (this.isLoggedIn) {
                throw Error('Already logged in!')
            }

            // TODO: Send login request, get response data
            this.storeLoginData()

            // Show the main screen
            router.push('/')
        },

        async logout() {

            // Reset this store
            this.$reset()
            localStorage.removeItem('refreshToken')

            // Show the login screen
            router.push('/login')
        },


        storeLoginData() {
            // TODO: Store data
            this.access_token = "access_token"
            this.refresh_token = "refresh_token"

            // Store refresh token in localStorage to keep the login even after the page is reloaded.
            localStorage.setItem('refreshToken', this.refresh_token)
        }
    }
})