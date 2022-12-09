<script setup lang="ts">
import { useDeviceStore } from '@/stores/devices';
import { fmtDateString, fmtMoney } from '@/utils/utils';
import { onMounted } from 'vue';

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

</script>

<template>
    Main View


    <table>
        <thead>
            <tr>
                <th>Location</th>
                <th>Type</th>
                <th>Health</th>
                <th>Last Used</th>
                <th>Price</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="device in deviceStore.devices" :key="device.id">
                <td>{{ device.location }}</td>
                <td>{{ device.type }}</td>
                <td>{{ device.device_health }}</td>
                <td>{{ fmtDateString(device.last_used) }}</td>
                <td>{{ fmtMoney(device.price) }}</td>
            </tr>
        </tbody>
    </table>
</template>