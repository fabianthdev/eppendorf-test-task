import { defineStore } from "pinia"
import Device from "@/models/Device"
import DeviceService from "@/services/DeviceService"


export const useDeviceStore = defineStore({
    id: 'devices',
    state: () => ({
        devices: new Array<Device>()
    }),

    actions: {
        async getDevices() {
            if (this.devices.length == 0) {
                let { data } = await DeviceService.getDevices()

                // Usually the API and business models should be different to react to backend changes
                // without having to change the frontend in a lot of places.
                this.devices = data
            }
            return this.devices
        },

        async getDeviceById(id: number) {
            if (this.devices.length == 0) {
                await this.getDevices()
            }

            return this.devices.find(device => device.id == id)
        }
    }
})