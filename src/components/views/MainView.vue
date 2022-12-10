<script setup lang="ts">
import { onMounted } from 'vue'
import { RouteLocationNamedRaw } from 'vue-router'
import { DeviceType } from '@/models/Device'
import { useAuthStore } from '@/stores/auth'
import { useDeviceStore } from '@/stores/devices'
import PageLayout from '../layout/PageLayout.vue'
import DeviceTypeCard from '../base/DeviceTypeCard.vue'
import FilledButton, { ButtonStyle as FilledButtonStyle } from '../base/FilledButton.vue'
import Button, { ButtonStyle } from '../base/Button.vue'
import PageTitle from '../layout/PageTitle.vue'

const authStore = useAuthStore()
const deviceStore = useDeviceStore()

// Load all devices when this page is mounted
onMounted(async () => {
    try {
        await deviceStore.getDevices()
    } catch (error) {
        // TODO: Error handling
        console.error(error);
    }
})

const linkForDeviceType = (deviceType?: DeviceType): RouteLocationNamedRaw => ({
    name: 'Device List',
    params: {
        deviceType: deviceType
    },
})

</script>

<template>
    <PageLayout>
        <PageTitle>
            Welcome, {{ authStore.user?.name ?? "User" }}!
            <template #actions>
                <FilledButton :style="FilledButtonStyle.Primary" @click="authStore.logout()">Logout</FilledButton>
            </template>
        </PageTitle>


        <div class="flex flex-col gap-4">
            <span class="flex flex-row justify-between">
                <h2 class="text-2xl font-semibold">Your Devices</h2>
                <RouterLink :to="linkForDeviceType(undefined)">
                    <Button :style="ButtonStyle.Secondary">Show all</Button>
                </RouterLink>
            </span>


            <div class="grid grid-cols-2 gap-4">
                <RouterLink v-for="deviceType in Object.values(DeviceType)" :to="linkForDeviceType(deviceType)">
                    <DeviceTypeCard :device-type="deviceType" />
                </RouterLink>
            </div>
        </div>
    </PageLayout>
</template>