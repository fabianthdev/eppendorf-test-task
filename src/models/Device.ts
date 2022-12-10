export enum DeviceHealth {
    Good = "good",
    Ok = "ok",
    Mediocre = "mediocre",
    Bad = "bad",
    Broken = "broken",
}

export enum DeviceType {
    Centrifuge = "centrifuge",
    Cycler = "cycler",
    Freezer = "freezer",
    Pipette = "pipette",
    Shaker = "shaker",
}

export default interface Device {
    id: number
    location: string
    type: DeviceType
    device_health: DeviceHealth
    last_used: string
    price: number
    color: string
} 