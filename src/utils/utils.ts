import colors from 'tailwindcss/colors'
import { DeviceHealth } from "@/models/Device"

// This email regex is taken from https://emailregex.com and should work with almost every
// email address that conforms to RFC 5322.
export const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

// Custom password regex using conditional lookaheads to validate:
// - at least one uppercase letter (lowercase letters are not required)
// - at least one digit
// - at least one special character
// - at least eight characters in total
export const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/


export const deviceHealthColor: { [key in DeviceHealth]: string } = {
    [DeviceHealth.Good]: colors.green[600],
    [DeviceHealth.Ok]: colors.lime[600],
    [DeviceHealth.Mediocre]: colors.yellow[600],
    [DeviceHealth.Bad]: colors.amber[600],
    [DeviceHealth.Broken]: colors.red[500],
}


export function fmtMoney(amount: number, currency: string = "EUR", forceSign: boolean = false): string {
    return new Intl.NumberFormat(undefined, { style: 'currency', currency: currency, signDisplay: forceSign ? 'always' : 'auto' }).format(amount);
}

export function fmtDateString(dateString: string): string {
    return Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(Date.parse(dateString))
}