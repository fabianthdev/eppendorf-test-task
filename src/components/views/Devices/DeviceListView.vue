<script setup lang="ts">
import { computed, ref, PropType } from 'vue'
import { ArrowSmallDownIcon, ArrowSmallUpIcon } from '@heroicons/vue/24/solid'
import Device, { DeviceType, DeviceHealth } from '@/models/Device'
import { useDeviceStore } from '@/stores/devices'
import { deviceHealthColor, fmtDateString, fmtMoney } from '@/utils/utils'
import PageLayout from '@/components/layout/PageLayout.vue'
import DeviceHealthBars from '@/components/base/DeviceHealthBars.vue'
import PageTitle from '@/components/layout/PageTitle.vue'

const deviceStore = useDeviceStore()

const props = defineProps({
    deviceType: {
        type: String as PropType<DeviceType>,
        default: undefined,
        required: false,
    },
})

// Override the deviceType prop to make sure the DeviceType is valid
const deviceType = computed(() => (props.deviceType?.length ?? 0) > 0 ? props.deviceType : undefined)

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
    var devices = deviceStore.devices.filter(d => d.type === (deviceType.value ?? d.type)).sort(deviceSortFunctions[selectedSortColumn.value])
    
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
        <PageTitle back-button-link="/" class="capitalize">{{ deviceType?.concat("s") ?? "All Devices" }}</PageTitle>

        <div class="p-4 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl">
            <span class="text-2xl font-bold">Status Overview</span>
            <div class="grid grid-cols-5 p-4">
                <div v-for="deviceHealth in Object.values(DeviceHealth)" class="flex flex-col items-center gap-2">
                    <div class="flex flex-col items-center justify-center aspect-square h-16 rounded-full" :style="`background-color: ${deviceHealthColor[deviceHealth]}`">
                        <span class="text-2xl text-white font-bold">{{ devices.filter(d => d.device_health == deviceHealth).length }}</span>
                    </div>
                    <span class="text-neutral-600 dark:text-neutral-400 text-sm">in {{ deviceHealth }} condition</span>
                </div>
            </div>
        </div>

        <div class="border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-clip">
            <table class="w-full">
                <thead>
                    <tr class="sticky top-0 bg-white dark:bg-neutral-900">
                        <th></th>
                        <th v-for="title, column in tableColumns" class="pt-4 pb-2 cursor-pointer" :class="{ 'text-primary dark:text-accent': selectedSortColumn == column }" @click="handleSortColumn(column)">
                            {{ title }}
                            <span v-if="selectedSortColumn == column">
                                <ArrowSmallDownIcon v-if="selectedSortDirection == SortDirection.Ascending" class="inline w-5 h-5 align-text-top" />
                                <ArrowSmallUpIcon v-if="selectedSortDirection == SortDirection.Descending" class="inline w-5 h-5 align-text-top" />
                            </span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="device in devices" :key="device.id">
                        <td class="max-w-min pl-2"><div class="w-2 h-full" :style="`background-color: ${device.color}`">&nbsp;</div></td>
                        <td>{{ device.location }}</td>
                        <td>{{ device.type }}</td>
                        <td><DeviceHealthBars :health="device.device_health" /></td>
                        <td class="text-gray-500">{{ fmtDateString(device.last_used) }}</td>
                        <td>{{ fmtMoney(device.price) }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </PageLayout>
</template>


<style scoped lang="css">
table th {
    text-align: left;
}

table th:last-child,
table td:last-child {
    @apply text-right pr-4;
}

table tbody tr:nth-child(odd) {
    @apply bg-neutral-200/60 dark:bg-neutral-800/30;
}

table td {
    @apply py-2;
}

</style>