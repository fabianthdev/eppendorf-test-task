<script setup lang="ts">
import { PropType } from 'vue'
import { DeviceHealth } from '@/models/Device'
import { deviceHealthColor } from '@/utils/utils';


defineProps({
    health: {
        type: String as PropType<DeviceHealth>,
        required: true,
    },
})

const maxHealthValue = Object.values(DeviceHealth).length
const healthValue = (health: DeviceHealth) => maxHealthValue - Object.values(DeviceHealth).indexOf(health)

</script>


<template>
    <div class="flex flex-row gap-0.5">
        <div v-for="i in healthValue(health)" class="h-4 w-2 rounded-xl" :style="`background-color: ${deviceHealthColor[health]}`"></div>
        <div v-for="i in maxHealthValue - healthValue(health)" class="h-4 w-2 rounded-xl bg-gray-300 dark:bg-neutral-600"></div>
    </div>
</template>