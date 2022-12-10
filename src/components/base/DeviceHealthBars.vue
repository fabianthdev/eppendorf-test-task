<script setup lang="ts">
import { PropType } from 'vue'
import colors from 'tailwindcss/colors'
import { DeviceHealth } from '@/models/Device'


defineProps({
    health: {
        type: String as PropType<DeviceHealth>,
        required: true,
    },
})

const healthColor: { [key in DeviceHealth]: string } = {
    [DeviceHealth.Good]: colors.green[600],
    [DeviceHealth.Ok]: colors.lime[600],
    [DeviceHealth.Mediocre]: colors.yellow[600],
    [DeviceHealth.Bad]: colors.amber[600],
    [DeviceHealth.Broken]: colors.red[500],
}

const maxHealthValue = Object.values(DeviceHealth).length
const healthValue = (health: DeviceHealth) => maxHealthValue - Object.values(DeviceHealth).indexOf(health)

</script>


<template>
    <div class="flex flex-row gap-0.5">
        <div v-for="i in healthValue(health)" class="h-4 w-2 rounded-xl" :style="'background-color: ' + healthColor[health]"></div>
        <div v-for="i in maxHealthValue - healthValue(health)" class="h-4 w-2 rounded-xl bg-gray-300 dark:bg-neutral-600"></div>
    </div>
</template>