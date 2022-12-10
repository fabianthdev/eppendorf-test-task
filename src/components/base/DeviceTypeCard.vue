<script setup lang="ts">
import { PropType } from 'vue'
import { CubeIcon } from '@heroicons/vue/24/outline'
import { DeviceType, DeviceHealth } from '@/models/Device'
import { useDeviceStore } from '@/stores/devices'
import DeviceHealthBars from '../base/DeviceHealthBars.vue'


defineProps({
    deviceType: {
        type: String as PropType<DeviceType>,
        required: true,
    },
})

const deviceStore = useDeviceStore()

const devicesWithType = (deviceType: DeviceType) => deviceStore.devices.filter(d => d.type == deviceType).sort((a, b) => a.location.localeCompare(b.location))
const criticalDevices = (deviceType: DeviceType) => devicesWithType(deviceType).filter(d => d.device_health == DeviceHealth.Broken)

</script>

<template>
    <div class="card p-4 border rounded-lg border-neutral-300 dark:border-neutral-700 transition-all">
        <div class="flex flex-row gap-2 w-full">
            <CubeIcon class="w-16 h-16 stroke-primary" />

            <div class="flex flex-col w-full">
                <span class="capitalize text-xl font-bold">{{ deviceType + "s" }}</span>
                <span class="text-sm text-gray-500 italic">{{ devicesWithType(deviceType).length }} devices</span>
                <span class="text-sm text-red-600 font-bold">{{ criticalDevices(deviceType).length}} in a critical status</span>


                <table>
                    <tr v-for="device in criticalDevices(deviceType).slice(undefined, 5)" :key="device.id">
                        <td>{{ device.location }}</td>
                        <td><DeviceHealthBars :health="device.device_health" /></td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>

<style scoped lang="css">

.card {
    @apply bg-gradient-to-tr from-neutral-200 to-transparent dark:from-neutral-800 dark:to-transparent hover:bg-neutral-200 dark:hover:bg-neutral-800 hover:shadow-lg;
}

.card span.more {
    @apply opacity-0;
}

.card:hover span.more {
    @apply opacity-100;
}

</style>