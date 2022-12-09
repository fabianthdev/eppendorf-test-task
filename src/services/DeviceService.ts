import Device from "@/models/Device"
import data from "@/data/data.json"
import { MockNetworkResult } from "@/utils/http"

class DeviceService {
    async getDevices() {
        // Mock request and response 
        return new Promise<MockNetworkResult<Device[]>>((resolve, reject) => {
            
            // Load data from the provided json
            resolve({
                statusCode: 200,
                data: Object.assign(new Array<Device>(), data)
            })
        })
    }
}

export default new DeviceService