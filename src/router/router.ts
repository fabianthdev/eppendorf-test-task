import 'vue-router'

declare module 'vue-router' {
    interface RouterMeta {
        requiresAuth: boolean,
    }
}

import { createRouter, createWebHistory } from 'vue-router'
import LoginView from "@/components/views/Auth/LoginView.vue"
import MainView from "@/components/views/MainView.vue"
import DeviceListView from "@/components/views/Devices/DeviceListView.vue"
import { useAuthStore } from '../stores/auth'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        
        {
            path: "/login",
            component: LoginView,
            meta: {
                requiresAuth: false,
            },
        },
        {
            path: "/",
            component: MainView,
            meta: {
                requiresAuth: true,
            },
        },
        {
            name: "Device List",
            path: "/devices/:deviceType?",
            component: DeviceListView,
            props: true,
            meta: {
                requiresAuth: true,
            },
        },
    ],
})


router.beforeEach(async (to) => {
    let isAuthenticated = useAuthStore().isLoggedIn

    if (to.meta.requiresAuth && !isAuthenticated) {
        return '/login'
    }
})

export default router