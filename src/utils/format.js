import { isString } from './dataCheckers'


// Numbers

/**
 * Converts a number to a string.
 * Always use to render numbers to the user.
 * @param {(number|string)} numberValue Number to convert
 * @param {boolean} [twoDigits = false]
 * @param {boolean} [isCurrency = false]
 * @returns {string} Result
 */
export function numberToString(numberValue, twoDigits = false, isCurrency = false) {
  if (!["", null, undefined].includes(numberValue)) {
    const number = Number(numberValue)
    if (!twoDigits && Number.isInteger(number)) {
      return (isCurrency ? '$' : '') + number.toLocaleString()
    }
    if (Number.isFinite(number)) {
      return (isCurrency ? '$' : '') + number.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    }
  }
  return "-"
}


// Dates

const timeFormat = { hour: "2-digit", minute: "2-digit" }
const dateFormat = (short) => ({ day: "2-digit", month: short ? "2-digit" : "long", year: "numeric" })
const timezoneHere = Intl.DateTimeFormat().resolvedOptions().timeZone

/**
 * Converts a datetime to a string.
 * Always use to render datetimes to the user.
 * @param {string} datetimeValue Datetime as an ISO string
 * @param {{ short: boolean, showDate: boolean, showTime: boolean }} [options = { short = false, showDate = true, showTime = true }] Short -> month = "2-digit", showDate/showTime -> enable/disable date and time
 * @returns {string} Result
 */
export function datetimeToString(datetimeValue, options) {
  const { short = false, showDate = true, showTime = true, timezone = null } = options || {}
  if (!datetimeValue) return "-"
  const date = new Date(datetimeValue)
  // Check Timezone
  const timezoneFormat = {}
  let timezoneString = ""
  if (timezone) {
    const dateInUtc = new Date(date.toLocaleString("en-US", { timeZone: "UTC" }))
    const timezoneOffset = (new Date(date.toLocaleString("en-US", { timeZone: timezone })) - dateInUtc) / 60 / 60 / 1000
    const timezoneHereOffset = (new Date(date.toLocaleString("en-US", { timeZone: timezoneHere })) - dateInUtc) / 60 / 60 / 1000
    if (timezoneOffset != timezoneHereOffset) {
      timezoneFormat.timeZone = timezone
      timezoneString = ` GMT${timezoneOffset.toFixed(2)}`
    }
  }
  return (
    (showDate ? date.toLocaleString([], { ...dateFormat(short), ...timezoneFormat }) : "") +
    (showDate && showTime ? " @ " : "") +
    (showTime ? date.toLocaleString([], { ...timeFormat, ...timezoneFormat }) : "") +
    (showTime ? timezoneString : "")
  )
}

/**
 * Converts a date to a string.
 * Always use to render dates to the user.
 * @param {string} datetimeValue Datetime as an ISO string
 * @param {{ short: boolean }} [options = { short = false }] Short -> month = "2-digit"
 * @returns {string} Result
 */
export function dateToString(datetimeValue, options) {
  const { short = false } = options || {}
  return !datetimeValue ? "-" :
    new Date(datetimeValue).toLocaleString([], { ...dateFormat(short), timeZone: "UTC" })
}

/**
 * Converts a time to a string.
 * Always use to render time to the user.
 * @param {string} datetimeValue Datetime as an ISO string (or just time as HH:MM)
 * @returns {string} Result
 */
export function timeToString(datetimeValue) {
  if (!datetimeValue) return "-"
  let date = new Date(datetimeValue)
  if (!date.valueOf()) {
    date = new Date(`2000-01-01T${datetimeValue}Z`)
    if (!date.valueOf()) return "-"
  }
  return date.toLocaleString([], { ...timeFormat, timeZone: "UTC" })
}

// - For Moment.js
const testDate = new Date("2000-11-12T13:14Z")

/**
 * Gets local date format to use with Moment.js
 * @returns {string} Result
 */
export const momentLocalDateFormat = testDate.toLocaleDateString([], { day: "2-digit", month: "2-digit", year: "numeric", timeZone: "UTC" })
  .replace("2000", "YYYY").replace("11", "MM").replace("12", "DD")

/**
 * Gets local time format to use with Moment.js
 * @returns {string} Result
 */
export const momentLocalTimeFormat = Intl.DateTimeFormat([], { hour: 'numeric' }).resolvedOptions().hourCycle === "h12" ? "hh:mm A" : "HH:mm"


// Strings

/**
 * Capitalize a string.
 * @param {string} value String to be capitalized
 * @returns {string} Result
 */
export function capitalizeString(value) {
  return isString(value) ? value.toLowerCase().replace(/(^\w)|(\s\w)/g, match => match.toUpperCase()) : ""
}

/**
 * Transform a mapping key into a better human-readable string.
 * @param {string} value Mapping key to be converted
 * @returns {string} Result
 */
export function mappingKeyToString(value) {
  return isString(value) ? capitalizeString(value.replace(/-|_|(?=[A-Z])/g, " ")) : ""
}
