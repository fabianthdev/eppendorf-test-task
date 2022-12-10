<script setup lang="ts">
import Device, { DeviceHealth, DeviceType } from '@/models/Device';
import { computed, onMounted, ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useDeviceStore } from '@/stores/devices';
import { fmtDateString, fmtMoney } from '@/utils/utils';
import DeviceHealthBars from '../base/DeviceHealthBars.vue';
import PageLayout from '../layout/PageLayout.vue';

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


enum SortColumn {
    Location, Type, Health, LastUsed, Price
}

enum SortDirection {
    Ascending, Descending
}

const deviceSortFunctions: { [key in SortColumn]: (a: Device, b: Device) => number } = {
    [SortColumn.Location]: (a: Device, b: Device) => a.location < b.location ? -1 : 1,
    [SortColumn.Type]: (a: Device, b: Device) => Object.values(DeviceType).indexOf(a.type) - Object.values(DeviceType).indexOf(b.type),
    [SortColumn.Health]: (a: Device, b: Device) => Object.values(DeviceHealth).indexOf(a.device_health) - Object.values(DeviceHealth).indexOf(b.device_health),
    [SortColumn.LastUsed]: (a: Device, b: Device) => Date.parse(a.last_used) - Date.parse(b.last_used),
    [SortColumn.Price]: (a: Device, b: Device) => a.price - b.price,
}

const selectedSortColumn = ref(SortColumn.Location)
const selectedSortDirection = ref(SortDirection.Ascending)
const devices = computed(() => {
    var devices = deviceStore.devices.sort(deviceSortFunctions[selectedSortColumn.value])
    
    if (selectedSortDirection.value == SortDirection.Descending) {
        devices = devices.reverse()
    }
    return devices
})


const tableColumns: { [key in SortColumn]: string } = {
    [SortColumn.Location]: "Location",
    [SortColumn.Type]: "Type",
    [SortColumn.Health]: "Health",
    [SortColumn.LastUsed]: "Last Used",
    [SortColumn.Price]: "Price"
}

const handleSortColumn = (column: SortColumn) => {
    if (selectedSortColumn.value != column) {
        // Sort by the newly selected column
        selectedSortColumn.value = column
        selectedSortDirection.value = SortDirection.Ascending
    } else {
        // Reverse the sorting direction
        if (selectedSortDirection.value == SortDirection.Ascending) {
            selectedSortDirection.value = SortDirection.Descending
        } else {
            selectedSortDirection.value = SortDirection.Ascending
        }
    }
}

</script>

<template>
    <PageLayout>
        <h1 class="text-3xl">Welcome, {{ authStore.user?.name ?? "User" }}</h1>

        <table class="w-full">
            <thead>
                <tr>
                    <th v-for="title, column in tableColumns" class="cursor-pointer" @click="handleSortColumn(column)">{{ title }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="device in devices" :key="device.id">
                    <td>{{ device.location }}</td>
                    <td>{{ device.type }}</td>
                    <td><DeviceHealthBars :health="device.device_health" /></td>
                    <td class="text-gray-500">{{ fmtDateString(device.last_used) }}</td>
                    <td>{{ fmtMoney(device.price) }}</td>
                </tr>
            </tbody>
        </table>
    </PageLayout>
</template>

<style scoped>

table th {
    text-align: left;
}

table th:last-child,
table td:last-child {
    text-align: right;
}

</style>